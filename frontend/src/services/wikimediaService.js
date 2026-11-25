const EXCLUDED_PHOTO_KEYWORDS = [
  'tropenmuseum',
  'collectie',
  'kitlv',
  'bundesarchiv',
  'almanak',
  'editor',
  'anggota',
  'sekretaris',
  'gubernur',
  'bupati',
  'walikota',
  'wali_kota',
  'flag_of',
  'coat_of_arms',
  'emblem',
  'logo',
  'locator',
  'blank_map',
  'map_of',
  'location_map',
  'peta_',
  'lambang',
  'bendera',
  'montage',
  'collage',
  'portrait',
  'tmnr',
  'circa',
  'monochrome',
  'black_and_white',
  'sepia',
  'barracks',
  'diagram',
  'chart',
  'stamp',
  'seal',
  'icon',
];

function stripHtml(html) {
  return String(html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function isOldPhoto(dateStr) {
  const m = String(dateStr || '').trim().match(/^(\d{4})\b/);
  return m ? Number(m[1]) < 2000 : false;
}

function hasBlockedKeyword(text) {
  const normalized = String(text || '').toLowerCase().replace(/[\s%20]+/g, '_');
  if (/\b18[89]\d\b|\b19[0-8]\d\b/.test(String(text || ''))) return true;
  return EXCLUDED_PHOTO_KEYWORDS.some((kw) => normalized.includes(kw));
}

export function cleanPhotoCaption(fileTitle) {
  let s = String(fileTitle || '').replace(/^file:/i, '');
  const dot = s.lastIndexOf('.');
  if (dot > 0) {
    s = s.slice(0, dot);
  }
  return s
    .replace(/\s*-?\s*panoramio.*$/i, '')
    .replace(/\(\d+\)\s*$/g, '')
    .replaceAll('_', ' ')
    .replaceAll('-', ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function queryWikimedia(searchTerm) {
  const endpoint =
    'https://commons.wikimedia.org/w/api.php' +
    `?action=query&generator=search&gsrsearch=${encodeURIComponent(searchTerm)}` +
    '&gsrnamespace=6&gsrlimit=16&prop=imageinfo&iiprop=url|mime|size|extmetadata&iiurlwidth=960&format=json&origin=*';

  const res = await fetch(endpoint);
  if (!res.ok) {
    throw new Error(`Wikimedia Commons request failed (${res.status})`);
  }

  const parsed = await res.json();
  const pages = parsed?.query?.pages || {};
  const photos = [];

  for (const page of Object.values(pages)) {
    const info = page?.imageinfo?.[0];
    if (!info || info.mime !== 'image/jpeg') {
      continue;
    }
    const width = Number(info.thumbwidth || info.width || 0);
    const height = Number(info.thumbheight || info.height || 0);
    if (width < 600 || height < 320 || width < height) {
      continue;
    }

    const title = page.title || '';
    const url = info.thumburl || info.url || '';
    const meta = info.extmetadata || {};
    const imgDesc = stripHtml(meta.ImageDescription?.value);
    const categories = stripHtml(meta.Categories?.value);
    const dateOriginal = stripHtml(meta.DateTimeOriginal?.value);

    if (!url || isOldPhoto(dateOriginal)) continue;
    if (
      hasBlockedKeyword(title) ||
      hasBlockedKeyword(url) ||
      hasBlockedKeyword(imgDesc) ||
      hasBlockedKeyword(categories)
    ) {
      continue;
    }

    photos.push({
      url,
      caption: cleanPhotoCaption(title),
    });
  }

  return photos;
}

/**
 * Fetch up to 6 curated modern scenic Wikimedia Commons photos for a province,
 * filtering out archival black-and-white scans, portraits, flags, and locator maps.
 */
export async function fetchWikimediaCandidates(province) {
  let photos = await queryWikimedia(`${province.name} landmark OR landscape`);

  if (photos.length < 3 && province.capital) {
    try {
      const capPhotos = await queryWikimedia(`${province.capital} tourism`);
      const seen = new Set(photos.map((p) => p.url));
      for (const item of capPhotos) {
        if (!seen.has(item.url)) {
          seen.add(item.url);
          photos.push(item);
        }
      }
    } catch {
      // Secondary capital lookup is best-effort.
    }
  }

  return photos.slice(0, 6);
}
