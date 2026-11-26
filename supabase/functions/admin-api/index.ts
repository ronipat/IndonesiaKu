import { createClient, type SupabaseClient, type User } from 'https://esm.sh/@supabase/supabase-js@2.49.1';

const DEFAULT_ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'http://localhost:5175',
  'http://127.0.0.1:5175',
];

const BUCKET_NAME = 'province-gallery';
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const PROVINCE_SLUG_RE = /^[a-z0-9-]+$/;
const ALLOWED_IMAGE_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

const EXCLUDED_PHOTO_KEYWORDS = [
  'flag_of',
  'coat_of_arms',
  'emblem',
  'logo',
  'locator',
  'blank_map',
  'map_of',
  'peta_',
  'lambang',
  'bendera',
  'icon',
];

function getAllowedOrigins(): Set<string> {
  const raw = String(Deno.env.get('ALLOWED_ORIGINS') || '').trim();
  if (!raw) {
    return new Set(DEFAULT_ALLOWED_ORIGINS);
  }
  const configured = raw
    .split(',')
    .map((origin) => origin.trim().replace(/\/+$/, ''))
    .filter(Boolean);
  return new Set(configured.length > 0 ? configured : DEFAULT_ALLOWED_ORIGINS);
}

function buildCorsHeaders(req: Request): Record<string, string> {
  const reqOrigin = (req.headers.get('Origin') || '').replace(/\/+$/, '');
  const allowed = getAllowedOrigins();
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type, apikey, x-client-info',
    Vary: 'Origin',
  };
  if (reqOrigin && allowed.has(reqOrigin)) {
    headers['Access-Control-Allow-Origin'] = reqOrigin;
  }
  return headers;
}

function jsonResponse(req: Request, payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...buildCorsHeaders(req),
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

function errorResponse(req: Request, message: string, status = 400): Response {
  return jsonResponse(req, { error: message }, status);
}

function validateHttpUrl(raw: unknown, label: string, required = false): string | null {
  const cleaned = String(raw ?? '').trim();
  if (!cleaned) {
    if (required) throw new Error(`${label} is required`);
    return null;
  }
  let parsed: URL;
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

function getServiceClient(): SupabaseClient {
  const url = Deno.env.get('SUPABASE_URL');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !serviceKey) {
    throw new Error('Server configuration error');
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

async function requireAdmin(
  req: Request,
  serviceClient: SupabaseClient
): Promise<{ user: User; role: string } | Response> {
  const authHeader = req.headers.get('Authorization') || '';
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    return errorResponse(req, 'Missing Bearer authorization token', 401);
  }
  const token = match[1].trim();
  if (!token) {
    return errorResponse(req, 'Empty Bearer authorization token', 401);
  }

  const { data: userData, error: authError } = await serviceClient.auth.getUser(token);
  if (authError || !userData?.user) {
    return errorResponse(req, 'Invalid or expired session token', 401);
  }

  const { data: adminRow, error: adminError } = await serviceClient
    .from('admin_users')
    .select('role')
    .eq('user_id', userData.user.id)
    .maybeSingle();

  if (adminError) {
    console.error('Failed to verify admin membership:', adminError.message);
    return errorResponse(req, 'Failed to verify admin membership', 500);
  }
  if (!adminRow) {
    return errorResponse(req, 'Forbidden: user is not authorized as admin', 403);
  }

  return { user: userData.user, role: adminRow.role };
}

function normalizePath(rawPath: string): string {
  // Supabase Edge Functions receive either /functions/v1/admin-api/... or /admin-api/...
  const stripped = rawPath
    .replace(/^\/functions\/v1\/admin-api(?=\/|$)/, '')
    .replace(/^\/admin-api(?=\/|$)/, '');
  const trimmed = stripped.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function sanitizeFilename(name: string): string {
  const base = name.split(/[\\/]/).pop() || 'photo.jpg';
  const cleaned = base.replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '');
  return cleaned || 'photo.jpg';
}

function cleanPhotoCaption(fileTitle: string): string {
  let s = fileTitle.replace(/^file:/i, '');
  const dot = s.lastIndexOf('.');
  if (dot > 0) {
    s = s.slice(0, dot);
  }
  return s.replaceAll('_', ' ').replaceAll('-', ' ').trim();
}

async function queryWikimediaPhotos(
  searchTerm: string
): Promise<Array<{ url: string; caption: string }>> {
  const endpoint =
    'https://commons.wikimedia.org/w/api.php' +
    `?action=query&generator=search&gsrsearch=${encodeURIComponent(searchTerm)}` +
    '&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url|mime&iiurlwidth=800&format=json';

  const res = await fetch(endpoint, {
    headers: { 'User-Agent': 'IndonesiaKuAdminEdge/1.0' },
  });
  if (!res.ok) {
    throw new Error(`Wikimedia API returned status ${res.status}`);
  }
  const parsed = await res.json();
  const pages = parsed?.query?.pages || {};
  const photos: Array<{ url: string; caption: string }> = [];

  for (const page of Object.values(pages) as Array<{
    title?: string;
    imageinfo?: Array<{ url?: string; thumburl?: string; mime?: string }>;
  }>) {
    const info = page.imageinfo?.[0];
    if (!info || info.mime !== 'image/jpeg') {
      continue;
    }
    const title = page.title || '';
    const lowerTitle = title.toLowerCase();
    if (EXCLUDED_PHOTO_KEYWORDS.some((kw) => lowerTitle.includes(kw))) {
      continue;
    }
    const imgUrl = info.thumburl || info.url || '';
    if (!imgUrl) continue;
    photos.push({
      url: imgUrl,
      caption: cleanPhotoCaption(title),
    });
  }

  return photos;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: buildCorsHeaders(req) });
  }

  const url = new URL(req.url);
  const path = normalizePath(url.pathname);
  const method = req.method.toUpperCase();

  if (method === 'GET' && path === '/health') {
    return jsonResponse(req, { status: 'ok', service: 'indonesiaku-admin-api' });
  }

  let serviceClient: SupabaseClient;
  try {
    serviceClient = getServiceClient();
  } catch (err) {
    console.error('Service client init error:', (err as Error).message);
    return errorResponse(req, 'Internal server configuration error', 500);
  }

  const authResult = await requireAdmin(req, serviceClient);
  if (authResult instanceof Response) {
    return authResult;
  }

  try {
    // GET /me
    if (method === 'GET' && path === '/me') {
      return jsonResponse(req, {
        user: { id: authResult.user.id, email: authResult.user.email },
        role: authResult.role,
      });
    }

    // GET /provinces
    if (method === 'GET' && path === '/provinces') {
      const { data, error } = await serviceClient
        .from('provinces')
        .select('*, province_photos(count)')
        .order('name', { ascending: true });

      if (error) {
        console.error('GET /provinces failed:', error.message);
        return errorResponse(req, 'Failed to list provinces', 500);
      }

      const formatted = (data || []).map((row) => {
        const countArr = (row as { province_photos?: Array<{ count: number }> }).province_photos;
        const photoCount = Array.isArray(countArr) && countArr[0] ? Number(countArr[0].count) : 0;
        const { province_photos: _omit, ...rest } = row as Record<string, unknown>;
        return { ...rest, photo_count: photoCount };
      });
      return jsonResponse(req, formatted);
    }

    // POST /provinces
    if (method === 'POST' && path === '/provinces') {
      const body = await req.json();
      const name = String(body.name || '').trim();
      const id = slugify(String(body.id || name));
      const capital = String(body.capital || '').trim();
      const island = String(body.island || '').trim();
      const lat = Number(body.lat);
      const lng = Number(body.lng);
      const areaKm2 = Math.max(0, Math.round(Number(body.area_km2 || 0)));
      const population = Math.max(0, Math.round(Number(body.population || 0)));
      const description = String(body.description || '').trim();
      const descriptionId = body.description_id ? String(body.description_id).trim() : null;

      let audioUrl: string | null = null;
      let videoUrl: string | null = null;
      try {
        audioUrl = validateHttpUrl(body.audio_url, 'audio_url', false);
        videoUrl = validateHttpUrl(body.video_url, 'video_url', false);
      } catch (err) {
        return errorResponse(req, (err as Error).message, 400);
      }

      if (!id || !PROVINCE_SLUG_RE.test(id) || !name || !capital || !island) {
        return errorResponse(req, 'Valid id, name, capital, and island are required', 400);
      }
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
        return errorResponse(req, 'Valid numeric lat and lng are required', 400);
      }

      const { data, error } = await serviceClient
        .from('provinces')
        .insert({
          id,
          name,
          capital,
          island,
          lat,
          lng,
          area_km2: areaKm2,
          population,
          description,
          description_id: descriptionId,
          audio_url: audioUrl,
          video_url: videoUrl,
        })
        .select('*')
        .single();

      if (error) {
        console.error('POST /provinces failed:', error.message);
        return errorResponse(req, 'Failed to create province', 400);
      }
      return jsonResponse(req, { ...data, photo_count: 0 }, 201);
    }

    // Match /provinces/:id/photos/upload
    const uploadMatch = path.match(/^\/provinces\/([^/]+)\/photos\/upload$/);
    if (method === 'POST' && uploadMatch) {
      const provinceId = decodeURIComponent(uploadMatch[1]);
      if (!PROVINCE_SLUG_RE.test(provinceId)) {
        return errorResponse(req, 'Invalid province ID', 400);
      }

      const formData = await req.formData();
      const file = formData.get('file');
      const caption = String(formData.get('caption') || '').trim();

      if (!(file instanceof File)) {
        return errorResponse(req, 'Multipart form field "file" is required', 400);
      }
      if (!ALLOWED_IMAGE_MIME_TYPES.has(file.type)) {
        return errorResponse(req, 'Only JPEG, PNG, WebP, and GIF images are allowed', 400);
      }
      if (file.size <= 0 || file.size > MAX_UPLOAD_BYTES) {
        return errorResponse(req, 'Image file must be between 1 byte and 10 MB', 400);
      }

      const safeName = sanitizeFilename(file.name);
      const storagePath = `${provinceId}/${Date.now()}-${safeName}`;
      const bytes = new Uint8Array(await file.arrayBuffer());

      const { error: uploadError } = await serviceClient.storage
        .from(BUCKET_NAME)
        .upload(storagePath, bytes, {
          contentType: file.type,
          upsert: false,
        });
      if (uploadError) {
        console.error('Storage upload failed:', uploadError.message);
        return errorResponse(req, 'Failed to upload image to storage', 400);
      }

      const { data: pub } = serviceClient.storage.from(BUCKET_NAME).getPublicUrl(storagePath);

      const { data: existing } = await serviceClient
        .from('province_photos')
        .select('sort_order')
        .eq('province_id', provinceId)
        .order('sort_order', { ascending: false })
        .limit(1);

      const nextOrder = existing && existing[0] ? Number(existing[0].sort_order) + 1 : 0;

      const { data: inserted, error: insertError } = await serviceClient
        .from('province_photos')
        .insert({
          province_id: provinceId,
          url: pub.publicUrl,
          storage_path: storagePath,
          caption: caption || cleanPhotoCaption(safeName),
          sort_order: nextOrder,
        })
        .select('*')
        .single();

      if (insertError) {
        await serviceClient.storage.from(BUCKET_NAME).remove([storagePath]);
        console.error('Insert uploaded photo row failed:', insertError.message);
        return errorResponse(req, 'Failed to save uploaded photo record', 400);
      }
      return jsonResponse(req, inserted, 201);
    }

    // Match /provinces/:id/photos/import-wikimedia
    const importMatch = path.match(/^\/provinces\/([^/]+)\/photos\/import-wikimedia$/);
    if (method === 'POST' && importMatch) {
      const provinceId = decodeURIComponent(importMatch[1]);
      if (!PROVINCE_SLUG_RE.test(provinceId)) {
        return errorResponse(req, 'Invalid province ID', 400);
      }

      const { data: province, error: provError } = await serviceClient
        .from('provinces')
        .select('id, name, capital')
        .eq('id', provinceId)
        .single();

      if (provError || !province) {
        return errorResponse(req, 'Province not found', 404);
      }

      let candidates = await queryWikimediaPhotos(`${province.name} landmark OR landscape`);
      if (candidates.length < 3 && province.capital) {
        const capCandidates = await queryWikimediaPhotos(`${province.capital} tourism`);
        const seenUrls = new Set(candidates.map((c) => c.url));
        for (const item of capCandidates) {
          if (!seenUrls.has(item.url)) {
            seenUrls.add(item.url);
            candidates.push(item);
          }
        }
      }
      candidates = candidates.slice(0, 6);

      const { data: existingPhotos, error: existErr } = await serviceClient
        .from('province_photos')
        .select('url, sort_order')
        .eq('province_id', provinceId);

      if (existErr) {
        console.error('Fetch existing photos failed:', existErr.message);
        return errorResponse(req, 'Failed to inspect existing gallery', 500);
      }

      const existingUrls = new Set((existingPhotos || []).map((p) => p.url));
      let nextOrder = (existingPhotos || []).reduce(
        (max, p) => Math.max(max, Number(p.sort_order ?? 0)),
        -1
      ) + 1;

      const toInsert = candidates
        .filter((c) => !existingUrls.has(c.url))
        .map((c) => ({
          province_id: provinceId,
          url: c.url,
          storage_path: null,
          caption: c.caption,
          sort_order: nextOrder++,
        }));

      if (toInsert.length === 0) {
        return jsonResponse(req, { added: [], message: 'No new Wikimedia photos to add' });
      }

      const { data: inserted, error: insertError } = await serviceClient
        .from('province_photos')
        .insert(toInsert)
        .select('*');

      if (insertError) {
        console.error('Insert Wikimedia photos failed:', insertError.message);
        return errorResponse(req, 'Failed to save imported photos', 400);
      }
      return jsonResponse(req, { added: inserted || [] }, 201);
    }

    // Match /provinces/:id/photos/reorder
    const reorderMatch = path.match(/^\/provinces\/([^/]+)\/photos\/reorder$/);
    if (method === 'PUT' && reorderMatch) {
      const provinceId = decodeURIComponent(reorderMatch[1]);
      if (!PROVINCE_SLUG_RE.test(provinceId)) {
        return errorResponse(req, 'Invalid province ID', 400);
      }

      const body = await req.json();
      const photoIds = Array.isArray(body.photoIds) ? body.photoIds.map(String) : [];

      for (let i = 0; i < photoIds.length; i++) {
        const { error } = await serviceClient
          .from('province_photos')
          .update({ sort_order: i })
          .eq('id', photoIds[i])
          .eq('province_id', provinceId);
        if (error) {
          console.error('Reorder photo failed:', error.message);
          return errorResponse(req, 'Failed to reorder photos', 400);
        }
      }

      const { data: updated, error: listErr } = await serviceClient
        .from('province_photos')
        .select('*')
        .eq('province_id', provinceId)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: true });

      if (listErr) {
        console.error('List reordered photos failed:', listErr.message);
        return errorResponse(req, 'Failed to reload photos', 500);
      }
      return jsonResponse(req, updated || []);
    }

    // Match /provinces/:id/photos
    const photosMatch = path.match(/^\/provinces\/([^/]+)\/photos$/);
    if (photosMatch) {
      const provinceId = decodeURIComponent(photosMatch[1]);
      if (!PROVINCE_SLUG_RE.test(provinceId)) {
        return errorResponse(req, 'Invalid province ID', 400);
      }

      if (method === 'GET') {
        const { data, error } = await serviceClient
          .from('province_photos')
          .select('*')
          .eq('province_id', provinceId)
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: true });
        if (error) {
          console.error('GET province photos failed:', error.message);
          return errorResponse(req, 'Failed to load gallery photos', 500);
        }
        return jsonResponse(req, data || []);
      }

      if (method === 'POST') {
        const body = await req.json();
        const caption = String(body.caption || '').trim();
        let photoUrl: string | null = null;
        try {
          photoUrl = validateHttpUrl(body.url, 'url', true);
        } catch (err) {
          return errorResponse(req, (err as Error).message, 400);
        }

        let sortOrder = Number.isFinite(Number(body.sort_order)) ? Number(body.sort_order) : null;
        if (sortOrder === null) {
          const { data: existing } = await serviceClient
            .from('province_photos')
            .select('sort_order')
            .eq('province_id', provinceId)
            .order('sort_order', { ascending: false })
            .limit(1);
          sortOrder = existing && existing[0] ? Number(existing[0].sort_order) + 1 : 0;
        }

        const { data, error } = await serviceClient
          .from('province_photos')
          .insert({
            province_id: provinceId,
            url: photoUrl,
            storage_path: null,
            caption,
            sort_order: sortOrder,
          })
          .select('*')
          .single();

        if (error) {
          console.error('POST photo URL failed:', error.message);
          return errorResponse(req, 'Failed to add photo', 400);
        }
        return jsonResponse(req, data, 201);
      }
    }

    // Match /provinces/:id
    const provMatch = path.match(/^\/provinces\/([^/]+)$/);
    if (provMatch) {
      const provinceId = decodeURIComponent(provMatch[1]);
      if (!PROVINCE_SLUG_RE.test(provinceId)) {
        return errorResponse(req, 'Invalid province ID', 400);
      }

      if (method === 'PATCH') {
        const body = await req.json();
        const updates: Record<string, unknown> = {};
        if (body.name !== undefined) updates.name = String(body.name).trim();
        if (body.capital !== undefined) updates.capital = String(body.capital).trim();
        if (body.island !== undefined) updates.island = String(body.island).trim();
        if (body.lat !== undefined) updates.lat = Number(body.lat);
        if (body.lng !== undefined) updates.lng = Number(body.lng);
        if (body.area_km2 !== undefined) {
          updates.area_km2 = Math.max(0, Math.round(Number(body.area_km2)));
        }
        if (body.population !== undefined) {
          updates.population = Math.max(0, Math.round(Number(body.population)));
        }
        if (body.description !== undefined) updates.description = String(body.description);
        if (body.description_id !== undefined) {
          updates.description_id = body.description_id ? String(body.description_id) : null;
        }
        try {
          if (body.audio_url !== undefined) {
            updates.audio_url = validateHttpUrl(body.audio_url, 'audio_url', false);
          }
          if (body.video_url !== undefined) {
            updates.video_url = validateHttpUrl(body.video_url, 'video_url', false);
          }
        } catch (err) {
          return errorResponse(req, (err as Error).message, 400);
        }

        const { data, error } = await serviceClient
          .from('provinces')
          .update(updates)
          .eq('id', provinceId)
          .select('*')
          .single();

        if (error) {
          console.error('PATCH province failed:', error.message);
          return errorResponse(req, 'Failed to update province', 400);
        }
        return jsonResponse(req, data);
      }

      if (method === 'DELETE') {
        const { data: photos } = await serviceClient
          .from('province_photos')
          .select('storage_path')
          .eq('province_id', provinceId);

        const storagePaths = (photos || [])
          .map((p) => p.storage_path)
          .filter((p): p is string => typeof p === 'string' && p.length > 0);

        if (storagePaths.length > 0) {
          await serviceClient.storage.from(BUCKET_NAME).remove(storagePaths);
        }

        const { error } = await serviceClient.from('provinces').delete().eq('id', provinceId);
        if (error) {
          console.error('DELETE province failed:', error.message);
          return errorResponse(req, 'Failed to delete province', 400);
        }
        return jsonResponse(req, { deleted: provinceId });
      }
    }

    // Match /photos/:photoId
    const photoItemMatch = path.match(/^\/photos\/([^/]+)$/);
    if (photoItemMatch) {
      const photoId = decodeURIComponent(photoItemMatch[1]);

      if (method === 'PATCH') {
        const body = await req.json();
        const updates: Record<string, unknown> = {};
        if (body.caption !== undefined) updates.caption = String(body.caption);
        if (body.url !== undefined) {
          try {
            updates.url = validateHttpUrl(body.url, 'url', true);
          } catch (err) {
            return errorResponse(req, (err as Error).message, 400);
          }
        }
        if (body.sort_order !== undefined) updates.sort_order = Number(body.sort_order);

        const { data, error } = await serviceClient
          .from('province_photos')
          .update(updates)
          .eq('id', photoId)
          .select('*')
          .single();

        if (error) {
          console.error('PATCH photo failed:', error.message);
          return errorResponse(req, 'Failed to update photo', 400);
        }
        return jsonResponse(req, data);
      }

      if (method === 'DELETE') {
        const { data: existing, error: fetchErr } = await serviceClient
          .from('province_photos')
          .select('id, storage_path')
          .eq('id', photoId)
          .maybeSingle();

        if (fetchErr) {
          console.error('Fetch photo for delete failed:', fetchErr.message);
          return errorResponse(req, 'Failed to look up photo', 500);
        }
        if (!existing) return errorResponse(req, 'Photo not found', 404);

        const { error: delErr } = await serviceClient
          .from('province_photos')
          .delete()
          .eq('id', photoId);

        if (delErr) {
          console.error('DELETE photo failed:', delErr.message);
          return errorResponse(req, 'Failed to delete photo', 400);
        }

        if (existing.storage_path) {
          await serviceClient.storage.from(BUCKET_NAME).remove([existing.storage_path]);
        }

        return jsonResponse(req, { deleted: photoId });
      }
    }

    return errorResponse(req, `Route not found: ${method} ${path}`, 404);
  } catch (err) {
    console.error('Unhandled admin-api error:', (err as Error).message);
    return errorResponse(req, 'Internal server error', 500);
  }
});
