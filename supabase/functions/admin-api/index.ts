import { createClient, type SupabaseClient, type User } from 'https://esm.sh/@supabase/supabase-js@2.49.1';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type, apikey, x-client-info',
};

const BUCKET_NAME = 'province-gallery';

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

function jsonResponse(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...CORS_HEADERS,
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

function errorResponse(message: string, status = 400): Response {
  return jsonResponse({ error: message }, status);
}

function getServiceClient(): SupabaseClient {
  const url = Deno.env.get('SUPABASE_URL');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !serviceKey) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
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
    return errorResponse('Missing Bearer authorization token', 401);
  }
  const token = match[1].trim();
  if (!token) {
    return errorResponse('Empty Bearer authorization token', 401);
  }

  const { data: userData, error: authError } = await serviceClient.auth.getUser(token);
  if (authError || !userData?.user) {
    return errorResponse('Invalid or expired session token', 401);
  }

  const { data: adminRow, error: adminError } = await serviceClient
    .from('admin_users')
    .select('role')
    .eq('user_id', userData.user.id)
    .maybeSingle();

  if (adminError) {
    return errorResponse(`Failed to verify admin membership: ${adminError.message}`, 500);
  }
  if (!adminRow) {
    return errorResponse('Forbidden: user is not registered in admin_users', 403);
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
    if (!info || !info.mime?.startsWith('image/') || info.mime === 'image/svg+xml') {
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
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  const url = new URL(req.url);
  const path = normalizePath(url.pathname);
  const method = req.method.toUpperCase();

  if (method === 'GET' && path === '/health') {
    return jsonResponse({ status: 'ok', service: 'indonesiaku-admin-api' });
  }

  let serviceClient: SupabaseClient;
  try {
    serviceClient = getServiceClient();
  } catch (err) {
    return errorResponse((err as Error).message, 500);
  }

  const authResult = await requireAdmin(req, serviceClient);
  if (authResult instanceof Response) {
    return authResult;
  }

  try {
    // GET /me
    if (method === 'GET' && path === '/me') {
      return jsonResponse({
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

      if (error) return errorResponse(error.message, 500);

      const formatted = (data || []).map((row) => {
        const countArr = (row as { province_photos?: Array<{ count: number }> }).province_photos;
        const photoCount = Array.isArray(countArr) && countArr[0] ? Number(countArr[0].count) : 0;
        const { province_photos: _omit, ...rest } = row as Record<string, unknown>;
        return { ...rest, photo_count: photoCount };
      });
      return jsonResponse(formatted);
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
      const audioUrl = body.audio_url ? String(body.audio_url).trim() : null;
      const videoUrl = body.video_url ? String(body.video_url).trim() : null;

      if (!id || !name || !capital || !island) {
        return errorResponse('id, name, capital, and island are required', 400);
      }
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
        return errorResponse('Valid numeric lat and lng are required', 400);
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

      if (error) return errorResponse(error.message, 400);
      return jsonResponse({ ...data, photo_count: 0 }, 201);
    }

    // Match /provinces/:id/photos/upload
    const uploadMatch = path.match(/^\/provinces\/([^/]+)\/photos\/upload$/);
    if (method === 'POST' && uploadMatch) {
      const provinceId = decodeURIComponent(uploadMatch[1]);
      const formData = await req.formData();
      const file = formData.get('file');
      const caption = String(formData.get('caption') || '').trim();

      if (!(file instanceof File)) {
        return errorResponse('Multipart form field "file" is required', 400);
      }
      if (!file.type.startsWith('image/')) {
        return errorResponse('Only image files are allowed', 400);
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
      if (uploadError) return errorResponse(uploadError.message, 400);

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
        return errorResponse(insertError.message, 400);
      }
      return jsonResponse(inserted, 201);
    }

    // Match /provinces/:id/photos/import-wikimedia
    const importMatch = path.match(/^\/provinces\/([^/]+)\/photos\/import-wikimedia$/);
    if (method === 'POST' && importMatch) {
      const provinceId = decodeURIComponent(importMatch[1]);
      const { data: province, error: provError } = await serviceClient
        .from('provinces')
        .select('id, name, capital')
        .eq('id', provinceId)
        .single();

      if (provError || !province) {
        return errorResponse('Province not found', 404);
      }

      let candidates = await queryWikimediaPhotos(`${province.name} Indonesia`);
      if (candidates.length < 3 && province.capital) {
        const capCandidates = await queryWikimediaPhotos(`${province.capital} Indonesia`);
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

      if (existErr) return errorResponse(existErr.message, 500);

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
        return jsonResponse({ added: [], message: 'No new Wikimedia photos to add' });
      }

      const { data: inserted, error: insertError } = await serviceClient
        .from('province_photos')
        .insert(toInsert)
        .select('*');

      if (insertError) return errorResponse(insertError.message, 400);
      return jsonResponse({ added: inserted || [] }, 201);
    }

    // Match /provinces/:id/photos/reorder
    const reorderMatch = path.match(/^\/provinces\/([^/]+)\/photos\/reorder$/);
    if (method === 'PUT' && reorderMatch) {
      const provinceId = decodeURIComponent(reorderMatch[1]);
      const body = await req.json();
      const photoIds = Array.isArray(body.photoIds) ? body.photoIds.map(String) : [];

      for (let i = 0; i < photoIds.length; i++) {
        const { error } = await serviceClient
          .from('province_photos')
          .update({ sort_order: i })
          .eq('id', photoIds[i])
          .eq('province_id', provinceId);
        if (error) return errorResponse(error.message, 400);
      }

      const { data: updated, error: listErr } = await serviceClient
        .from('province_photos')
        .select('*')
        .eq('province_id', provinceId)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: true });

      if (listErr) return errorResponse(listErr.message, 500);
      return jsonResponse(updated || []);
    }

    // Match /provinces/:id/photos
    const photosMatch = path.match(/^\/provinces\/([^/]+)\/photos$/);
    if (photosMatch) {
      const provinceId = decodeURIComponent(photosMatch[1]);
      if (method === 'GET') {
        const { data, error } = await serviceClient
          .from('province_photos')
          .select('*')
          .eq('province_id', provinceId)
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: true });
        if (error) return errorResponse(error.message, 500);
        return jsonResponse(data || []);
      }

      if (method === 'POST') {
        const body = await req.json();
        const photoUrl = String(body.url || '').trim();
        const caption = String(body.caption || '').trim();
        if (!photoUrl) return errorResponse('url is required', 400);

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

        if (error) return errorResponse(error.message, 400);
        return jsonResponse(data, 201);
      }
    }

    // Match /provinces/:id
    const provMatch = path.match(/^\/provinces\/([^/]+)$/);
    if (provMatch) {
      const provinceId = decodeURIComponent(provMatch[1]);

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
        if (body.audio_url !== undefined) {
          updates.audio_url = body.audio_url ? String(body.audio_url).trim() : null;
        }
        if (body.video_url !== undefined) {
          updates.video_url = body.video_url ? String(body.video_url).trim() : null;
        }

        const { data, error } = await serviceClient
          .from('provinces')
          .update(updates)
          .eq('id', provinceId)
          .select('*')
          .single();

        if (error) return errorResponse(error.message, 400);
        return jsonResponse(data);
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
        if (error) return errorResponse(error.message, 400);
        return jsonResponse({ deleted: provinceId });
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
        if (body.url !== undefined) updates.url = String(body.url).trim();
        if (body.sort_order !== undefined) updates.sort_order = Number(body.sort_order);

        const { data, error } = await serviceClient
          .from('province_photos')
          .update(updates)
          .eq('id', photoId)
          .select('*')
          .single();

        if (error) return errorResponse(error.message, 400);
        return jsonResponse(data);
      }

      if (method === 'DELETE') {
        const { data: existing, error: fetchErr } = await serviceClient
          .from('province_photos')
          .select('id, storage_path')
          .eq('id', photoId)
          .maybeSingle();

        if (fetchErr) return errorResponse(fetchErr.message, 500);
        if (!existing) return errorResponse('Photo not found', 404);

        const { error: delErr } = await serviceClient
          .from('province_photos')
          .delete()
          .eq('id', photoId);

        if (delErr) return errorResponse(delErr.message, 400);

        if (existing.storage_path) {
          await serviceClient.storage.from(BUCKET_NAME).remove([existing.storage_path]);
        }

        return jsonResponse({ deleted: photoId });
      }
    }

    return errorResponse(`Route not found: ${method} ${path}`, 404);
  } catch (err) {
    return errorResponse((err as Error).message || 'Internal server error', 500);
  }
});
