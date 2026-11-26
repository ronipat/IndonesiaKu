import defaultProvinces from '../data/defaultProvinces.json';
import { ISLAND_LIST } from '../lib/geoMappings.js';
import { isSupabaseConfigured, supabase } from '../lib/supabase.js';

export const DEMO_PROVINCES_KEY = 'indonesiaku_demo_provinces';
export const DEMO_PHOTOS_KEY = 'indonesiaku_demo_photos';

export function buildDefaultDescription(p, lang = 'en') {
  const isId = String(lang || 'en').toLowerCase().startsWith('id');
  const locale = isId ? 'id-ID' : 'en-US';
  const area = Number(p.area_km2 || 0).toLocaleString(locale);
  const pop = Number(p.population || 0).toLocaleString(locale);
  const density =
    Number(p.area_km2) > 0
      ? (Number(p.population || 0) / Number(p.area_km2)).toLocaleString(locale, {
          maximumFractionDigits: 1,
        })
      : '0';

  if (isId) {
    const islandLabel =
      p.island === 'Sumatra' ? 'Sumatera' : p.island === 'Java' ? 'Jawa' : p.island;
    return `${p.name} adalah provinsi di Indonesia yang terletak di wilayah ${islandLabel}, dengan ibu kota ${p.capital}. Provinsi ini memiliki luas wilayah sekitar ${area} kilometer persegi dan jumlah penduduk diperkirakan mencapai ${pop} jiwa, dengan kepadatan sekitar ${density} jiwa per kilometer persegi.`;
  }

  return `${p.name} is an Indonesian province in the ${p.island} region, with ${p.capital} as its capital city. It covers ${area} square kilometers and has an estimated population of ${pop} residents, with a density of about ${density} people per square kilometer.`;
}

export function readDemoProvinces() {
  const defaultById = new Map(defaultProvinces.map((p) => [p.id, p]));
  try {
    const raw = localStorage.getItem(DEMO_PROVINCES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.map((p) => ({
          ...p,
          description_id: p.description_id || defaultById.get(p.id)?.description_id || '',
        }));
      }
    }
  } catch {
    // Fall back to bundled seed data if localStorage is corrupted.
  }
  const seeded = defaultProvinces.map((p) => ({
    ...p,
    description_id: p.description_id || '',
    audio_url: p.audio_url || null,
    video_url: p.video_url || null,
  }));
  writeDemoProvinces(seeded);
  return seeded;
}

export function writeDemoProvinces(list) {
  localStorage.setItem(DEMO_PROVINCES_KEY, JSON.stringify(list));
}

export function readDemoPhotosMap() {
  try {
    const raw = localStorage.getItem(DEMO_PHOTOS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch {
    // Ignore invalid storage payload.
  }
  return {};
}

export function writeDemoPhotosMap(map) {
  localStorage.setItem(DEMO_PHOTOS_KEY, JSON.stringify(map));
}

function summarizeIslands(provinces) {
  const map = new Map();
  for (const p of provinces) {
    const current = map.get(p.island) || {
      name: p.island,
      province_count: 0,
      total_population: 0,
    };
    current.province_count += 1;
    current.total_population += Number(p.population || 0);
    map.set(p.island, current);
  }

  return Array.from(map.values()).sort((a, b) => {
    const ia = ISLAND_LIST.indexOf(a.name);
    const ib = ISLAND_LIST.indexOf(b.name);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return a.name.localeCompare(b.name);
  });
}

function sanitizeSearchTerm(term) {
  return String(term || '')
    .replace(/[,().%_*\\"']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function checkHealth() {
  if (!isSupabaseConfigured) {
    return { status: 'demo', mode: 'demo' };
  }
  const { error } = await supabase
    .from('provinces')
    .select('id', { count: 'exact', head: true });
  if (error) {
    throw new Error(error.message || 'Failed to reach Supabase database');
  }
  return { status: 'online', mode: 'supabase' };
}

export async function getProvinces({ island = '', q = '' } = {}) {
  const trimmedIsland = island.trim();
  const trimmedQuery = q.trim();

  if (!isSupabaseConfigured) {
    const lowerQ = trimmedQuery.toLowerCase();
    return readDemoProvinces()
      .filter((p) => {
        if (trimmedIsland && p.island.toLowerCase() !== trimmedIsland.toLowerCase()) {
          return false;
        }
        if (lowerQ) {
          return (
            p.name.toLowerCase().includes(lowerQ) ||
            p.capital.toLowerCase().includes(lowerQ)
          );
        }
        return true;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  let query = supabase
    .from('provinces')
    .select('*')
    .order('name', { ascending: true });

  if (trimmedIsland) {
    query = query.eq('island', trimmedIsland);
  }
  if (trimmedQuery) {
    const safe = sanitizeSearchTerm(trimmedQuery);
    if (safe) {
      query = query.or(`name.ilike.%${safe}%,capital.ilike.%${safe}%`);
    }
  }

  const { data, error } = await query;
  if (error) {
    throw new Error(error.message || 'Failed to load provinces from Supabase');
  }
  return data || [];
}

export async function getProvince(id) {
  if (!isSupabaseConfigured) {
    const found = readDemoProvinces().find((p) => p.id === id);
    if (!found) {
      throw new Error('Province not found');
    }
    return found;
  }

  const { data, error } = await supabase
    .from('provinces')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message || 'Province not found');
  }
  return data;
}

export async function getProvincePhotos(id) {
  if (!isSupabaseConfigured) {
    const map = readDemoPhotosMap();
    const list = Array.isArray(map[id]) ? map[id] : [];
    return [...list].sort(
      (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
    );
  }

  const { data, error } = await supabase
    .from('province_photos')
    .select('*')
    .eq('province_id', id)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error(error.message || 'Failed to load gallery photos');
  }
  return data || [];
}

export async function getIslands() {
  if (!isSupabaseConfigured) {
    return summarizeIslands(readDemoProvinces());
  }

  const { data, error } = await supabase
    .from('island_groups')
    .select('name, province_count, total_population');

  if (!error && Array.isArray(data)) {
    return data;
  }

  const { data: rows, error: provError } = await supabase
    .from('provinces')
    .select('island, population');

  if (provError) {
    throw new Error(provError.message || 'Failed to load island groups');
  }
  return summarizeIslands(rows || []);
}

export async function getGeoJSON() {
  const res = await fetch('/data/indonesia-provinces.geojson');
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error(`Failed to load GeoJSON (${res.status})`);
  }
  return res.json();
}
