import defaultProvinces from '../data/defaultProvinces.json';
import {
  isSupabaseConfigured,
  supabase,
  supabaseAnonKey,
  supabaseUrl,
  useAdminEdgeFunction,
} from '../lib/supabase.js';
import {
  DEMO_PHOTOS_KEY,
  DEMO_PROVINCES_KEY,
  readDemoPhotosMap,
  readDemoProvinces,
  writeDemoPhotosMap,
  writeDemoProvinces,
} from './provinceService.js';
import { cleanPhotoCaption, fetchWikimediaCandidates } from './wikimediaService.js';

const BUCKET_NAME = 'province-gallery';
const MAX_DEMO_IMAGE_BYTES = 2 * 1024 * 1024;
const MAX_LIVE_IMAGE_BYTES = 10 * 1024 * 1024;
const ALLOWED_IMAGE_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);
const DATA_IMAGE_URL_RE = /^data:image\/(jpeg|png|webp|gif);base64,[a-z0-9+/=]+$/i;

function assertHttpUrl(raw, label, { required = false } = {}) {
  const cleaned = String(raw || '').trim();
  if (!cleaned) {
    if (required) {
      throw new Error(`${label} is required`);
    }
    return null;
  }
  let parsed;
  try {
    parsed = new URL(cleaned);
  } catch {
    throw new Error(`${label} must be a valid http:// or https:// URL`);
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new Error(`${label} must start with http:// or https://`);
  }
  return cleaned;
}

function sanitizeFilename(name) {
  const base = String(name || 'photo.jpg').split(/[\\/]/).pop() || 'photo.jpg';
  const cleaned = base.replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '');
  return cleaned || 'photo.jpg';
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.readAsDataURL(file);
  });
}

async function getAccessToken() {
  if (!supabase) throw new Error('Supabase client is not configured');
  const { data, error } = await supabase.auth.getSession();
  if (error) throw new Error(error.message);
  const token = data?.session?.access_token;
  if (!token) throw new Error('You must sign in as an admin first');
  return token;
}

async function edgeRequest(path, options = {}) {
  const token = await getAccessToken();
  const headers = new Headers(options.headers || {});
  headers.set('Authorization', `Bearer ${token}`);
  headers.set('apikey', supabaseAnonKey);

  if (options.body && !(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const res = await fetch(`${supabaseUrl}/functions/v1/admin-api${path}`, {
    ...options,
    headers,
  });

  const payload = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(payload?.error || `Admin API request failed (${res.status})`);
  }
  return payload;
}

export async function getAdminSession() {
  if (!isSupabaseConfigured) {
    return {
      mode: 'demo',
      user: { id: 'demo-admin', email: 'demo@indonesiaku.local' },
      role: 'admin',
      isAdmin: true,
    };
  }

  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw new Error(error.message);
  }
  const user = data?.session?.user || null;
  if (!user) {
    return { mode: 'supabase', user: null, role: null, isAdmin: false };
  }

  if (useAdminEdgeFunction) {
    try {
      const me = await edgeRequest('/me', { method: 'GET' });
      return {
        mode: 'supabase-edge',
        user,
        role: me.role || 'admin',
        isAdmin: true,
      };
    } catch {
      return { mode: 'supabase-edge', user, role: null, isAdmin: false };
    }
  }

  const { data: adminRow, error: adminErr } = await supabase
    .from('admin_users')
    .select('role')
    .eq('user_id', user.id)
    .maybeSingle();

  if (adminErr) {
    throw new Error(adminErr.message);
  }

  return {
    mode: 'supabase',
    user,
    role: adminRow?.role || null,
    isAdmin: Boolean(adminRow),
  };
}

export async function signInAdmin(email, password) {
  if (!isSupabaseConfigured) {
    return getAdminSession();
  }
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return getAdminSession();
}

export async function signOutAdmin() {
  if (!isSupabaseConfigured) {
    return;
  }
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function listAdminProvinces() {
  if (!isSupabaseConfigured) {
    const provinces = readDemoProvinces();
    const photosMap = readDemoPhotosMap();
    return [...provinces]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((p) => ({
        ...p,
        photo_count: Array.isArray(photosMap[p.id]) ? photosMap[p.id].length : 0,
      }));
  }

  if (useAdminEdgeFunction) {
    return edgeRequest('/provinces', { method: 'GET' });
  }

  const { data, error } = await supabase
    .from('provinces')
    .select('*, province_photos(count)')
    .order('name', { ascending: true });

  if (error) {
    throw new Error(error.message || 'Failed to list provinces');
  }

  return (data || []).map((row) => {
    const countArr = row.province_photos;
    const photoCount =
      Array.isArray(countArr) && countArr[0] ? Number(countArr[0].count) : 0;
    const { province_photos: _omit, ...rest } = row;
    return {
      ...rest,
      photo_count: photoCount,
    };
  });
}

export async function updateProvince(id, payload) {
  const updates = {
    name: String(payload.name || '').trim(),
    capital: String(payload.capital || '').trim(),
    island: String(payload.island || '').trim(),
    lat: Number(payload.lat),
    lng: Number(payload.lng),
    area_km2: Math.max(0, Math.round(Number(payload.area_km2 || 0))),
    population: Math.max(0, Math.round(Number(payload.population || 0))),
    description: String(payload.description || ''),
    description_id: String(payload.description_id || ''),
    audio_url: assertHttpUrl(payload.audio_url, 'Audio URL'),
    video_url: assertHttpUrl(payload.video_url, 'Video URL'),
  };

  if (!updates.name || !updates.capital || !updates.island) {
    throw new Error('Name, capital, and island group are required');
  }
  if (!Number.isFinite(updates.lat) || !Number.isFinite(updates.lng)) {
    throw new Error('Latitude and longitude must be valid numbers');
  }

  if (!isSupabaseConfigured) {
    const list = readDemoProvinces();
    const index = list.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error('Province not found');
    }
    const updated = {
      ...list[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    const next = [...list];
    next[index] = updated;
    writeDemoProvinces(next);
    return updated;
  }

  if (useAdminEdgeFunction) {
    return edgeRequest(`/provinces/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  const { data, error } = await supabase
    .from('provinces')
    .update(updates)
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    throw new Error(error.message || 'Failed to update province');
  }
  return data;
}

export async function listProvincePhotos(provinceId) {
  if (!isSupabaseConfigured) {
    const map = readDemoPhotosMap();
    const items = Array.isArray(map[provinceId]) ? map[provinceId] : [];
    return [...items].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
  }

  if (useAdminEdgeFunction) {
    return edgeRequest(`/provinces/${encodeURIComponent(provinceId)}/photos`, {
      method: 'GET',
    });
  }

  const { data, error } = await supabase
    .from('province_photos')
    .select('*')
    .eq('province_id', provinceId)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error(error.message || 'Failed to load province photos');
  }
  return data || [];
}

export async function addProvincePhotoByUrl(
  provinceId,
  { url, caption = '', allowDataImage = false }
) {
  const rawUrl = String(url || '').trim();
  const isAllowedDataImage = allowDataImage && DATA_IMAGE_URL_RE.test(rawUrl);
  const cleanUrl = isAllowedDataImage
    ? rawUrl
    : assertHttpUrl(rawUrl, 'Image URL', { required: true });
  const cleanCaption = String(caption || '').trim();

  if (!isSupabaseConfigured) {
    const map = readDemoPhotosMap();
    const list = Array.isArray(map[provinceId]) ? map[provinceId] : [];
    const nextOrder =
      list.reduce((max, item) => Math.max(max, Number(item.sort_order ?? 0)), -1) + 1;
    const item = {
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      province_id: provinceId,
      url: cleanUrl,
      storage_path: null,
      caption: cleanCaption,
      sort_order: nextOrder,
      created_at: new Date().toISOString(),
    };
    map[provinceId] = [...list, item];
    writeDemoPhotosMap(map);
    return item;
  }

  if (useAdminEdgeFunction) {
    return edgeRequest(`/provinces/${encodeURIComponent(provinceId)}/photos`, {
      method: 'POST',
      body: JSON.stringify({ url: cleanUrl, caption: cleanCaption }),
    });
  }

  const { data: existing } = await supabase
    .from('province_photos')
    .select('sort_order')
    .eq('province_id', provinceId)
    .order('sort_order', { ascending: false })
    .limit(1);

  const nextOrder = existing && existing[0] ? Number(existing[0].sort_order) + 1 : 0;

  const { data, error } = await supabase
    .from('province_photos')
    .insert({
      province_id: provinceId,
      url: cleanUrl,
      storage_path: null,
      caption: cleanCaption,
      sort_order: nextOrder,
    })
    .select('*')
    .single();

  if (error) {
    throw new Error(error.message || 'Failed to add photo');
  }
  return data;
}

export async function uploadProvincePhoto(provinceId, file, caption = '') {
  if (!file) {
    throw new Error('Select an image file to upload');
  }
  if (!ALLOWED_IMAGE_MIME_TYPES.has(file.type)) {
    throw new Error('Only JPEG, PNG, WebP, and GIF images are supported');
  }

  const safeName = sanitizeFilename(file.name);
  const resolvedCaption = String(caption || '').trim() || cleanPhotoCaption(safeName);

  if (!isSupabaseConfigured) {
    if (file.size > MAX_DEMO_IMAGE_BYTES) {
      throw new Error('Demo mode caps local uploads at 2 MB (use Supabase Storage in live mode for up to 10 MB)');
    }
    const dataUrl = await readFileAsDataURL(file);
    return addProvincePhotoByUrl(provinceId, {
      url: dataUrl,
      caption: resolvedCaption,
      allowDataImage: true,
    });
  }

  if (file.size > MAX_LIVE_IMAGE_BYTES) {
    throw new Error('Image file exceeds the 10 MB upload limit');
  }

  if (useAdminEdgeFunction) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('caption', resolvedCaption);
    return edgeRequest(`/provinces/${encodeURIComponent(provinceId)}/photos/upload`, {
      method: 'POST',
      body: formData,
    });
  }

  const storagePath = `${provinceId}/${Date.now()}-${safeName}`;
  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(storagePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    throw new Error(uploadError.message || 'Failed to upload image to Storage');
  }

  const { data: pub } = supabase.storage.from(BUCKET_NAME).getPublicUrl(storagePath);

  const { data: existing } = await supabase
    .from('province_photos')
    .select('sort_order')
    .eq('province_id', provinceId)
    .order('sort_order', { ascending: false })
    .limit(1);

  const nextOrder = existing && existing[0] ? Number(existing[0].sort_order) + 1 : 0;

  const { data, error: insertError } = await supabase
    .from('province_photos')
    .insert({
      province_id: provinceId,
      url: pub.publicUrl,
      storage_path: storagePath,
      caption: resolvedCaption,
      sort_order: nextOrder,
    })
    .select('*')
    .single();

  if (insertError) {
    await supabase.storage.from(BUCKET_NAME).remove([storagePath]);
    throw new Error(insertError.message || 'Failed to save uploaded photo record');
  }

  return data;
}

export async function updateProvincePhoto(photoId, { caption, url, sort_order }) {
  const updates = {};
  if (caption !== undefined) updates.caption = String(caption);
  if (url !== undefined) updates.url = assertHttpUrl(url, 'Image URL', { required: true });
  if (sort_order !== undefined) updates.sort_order = Number(sort_order);

  if (!isSupabaseConfigured) {
    const map = readDemoPhotosMap();
    for (const [provId, list] of Object.entries(map)) {
      const idx = list.findIndex((p) => p.id === photoId);
      if (idx !== -1) {
        const updated = { ...list[idx], ...updates };
        const nextList = [...list];
        nextList[idx] = updated;
        map[provId] = nextList;
        writeDemoPhotosMap(map);
        return updated;
      }
    }
    throw new Error('Photo not found');
  }

  if (useAdminEdgeFunction) {
    return edgeRequest(`/photos/${encodeURIComponent(photoId)}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  const { data, error } = await supabase
    .from('province_photos')
    .update(updates)
    .eq('id', photoId)
    .select('*')
    .single();

  if (error) {
    throw new Error(error.message || 'Failed to update photo');
  }
  return data;
}

export async function reorderProvincePhotos(provinceId, photoIds) {
  if (!isSupabaseConfigured) {
    const map = readDemoPhotosMap();
    const list = Array.isArray(map[provinceId]) ? map[provinceId] : [];
    const byId = new Map(list.map((p) => [p.id, p]));
    const reordered = photoIds
      .map((id, idx) => {
        const item = byId.get(id);
        return item ? { ...item, sort_order: idx } : null;
      })
      .filter(Boolean);
    map[provinceId] = reordered;
    writeDemoPhotosMap(map);
    return reordered;
  }

  if (useAdminEdgeFunction) {
    return edgeRequest(`/provinces/${encodeURIComponent(provinceId)}/photos/reorder`, {
      method: 'PUT',
      body: JSON.stringify({ photoIds }),
    });
  }

  for (let i = 0; i < photoIds.length; i++) {
    const { error } = await supabase
      .from('province_photos')
      .update({ sort_order: i })
      .eq('id', photoIds[i])
      .eq('province_id', provinceId);
    if (error) {
      throw new Error(error.message || 'Failed to reorder photos');
    }
  }

  return listProvincePhotos(provinceId);
}

export async function deleteProvincePhoto(photo) {
  if (!isSupabaseConfigured) {
    const map = readDemoPhotosMap();
    const provId = photo.province_id;
    if (provId && Array.isArray(map[provId])) {
      map[provId] = map[provId].filter((p) => p.id !== photo.id);
      writeDemoPhotosMap(map);
    } else {
      for (const [k, list] of Object.entries(map)) {
        map[k] = list.filter((p) => p.id !== photo.id);
      }
      writeDemoPhotosMap(map);
    }
    return { deleted: photo.id };
  }

  if (useAdminEdgeFunction) {
    return edgeRequest(`/photos/${encodeURIComponent(photo.id)}`, {
      method: 'DELETE',
    });
  }

  const { error } = await supabase
    .from('province_photos')
    .delete()
    .eq('id', photo.id);

  if (error) {
    throw new Error(error.message || 'Failed to delete photo');
  }

  if (photo.storage_path) {
    await supabase.storage.from(BUCKET_NAME).remove([photo.storage_path]);
  }

  return { deleted: photo.id };
}

export async function importWikimediaPhotos(province) {
  if (isSupabaseConfigured && useAdminEdgeFunction) {
    return edgeRequest(
      `/provinces/${encodeURIComponent(province.id)}/photos/import-wikimedia`,
      { method: 'POST' }
    );
  }

  const candidates = await fetchWikimediaCandidates(province);
  if (candidates.length === 0) {
    return { added: [] };
  }

  const existing = await listProvincePhotos(province.id);
  const existingUrls = new Set(existing.map((p) => p.url));
  const fresh = candidates.filter((c) => !existingUrls.has(c.url));
  if (fresh.length === 0) {
    return { added: [] };
  }

  if (!isSupabaseConfigured) {
    const added = [];
    for (const item of fresh) {
      const inserted = await addProvincePhotoByUrl(province.id, item);
      added.push(inserted);
    }
    return { added };
  }

  let nextOrder =
    existing.reduce((max, p) => Math.max(max, Number(p.sort_order ?? 0)), -1) + 1;

  const rows = fresh.map((item) => ({
    province_id: province.id,
    url: item.url,
    storage_path: null,
    caption: item.caption,
    sort_order: nextOrder++,
  }));

  const { data, error } = await supabase
    .from('province_photos')
    .insert(rows)
    .select('*');

  if (error) {
    throw new Error(error.message || 'Failed to import Wikimedia photos');
  }

  return { added: data || [] };
}

export function resetDemoData() {
  if (isSupabaseConfigured) return;
  localStorage.removeItem(DEMO_PROVINCES_KEY);
  localStorage.removeItem(DEMO_PHOTOS_KEY);
  writeDemoProvinces(
    defaultProvinces.map((p) => ({
      ...p,
      description_id: p.description_id || '',
      audio_url: p.audio_url || null,
      video_url: p.video_url || null,
    }))
  );
  writeDemoPhotosMap({});
}
