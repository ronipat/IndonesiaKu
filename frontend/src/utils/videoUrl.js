function extractYouTubeId(parsedUrl) {
  const host = parsedUrl.hostname.replace(/^www\.|^m\./, '').toLowerCase();
  const pathParts = parsedUrl.pathname.split('/').filter(Boolean);

  if (host === 'youtu.be') {
    return pathParts[0] || '';
  }
  if (
    host === 'youtube.com' ||
    host === 'music.youtube.com' ||
    host === 'youtube-nocookie.com'
  ) {
    if (pathParts[0] === 'watch') {
      return parsedUrl.searchParams.get('v') || '';
    }
    if (
      pathParts[0] === 'embed' ||
      pathParts[0] === 'shorts' ||
      pathParts[0] === 'live'
    ) {
      return pathParts[1] || '';
    }
    return parsedUrl.searchParams.get('v') || '';
  }
  return '';
}

function extractVimeoId(parsedUrl) {
  const host = parsedUrl.hostname.replace(/^www\./, '').toLowerCase();
  const pathParts = parsedUrl.pathname.split('/').filter(Boolean);

  if (host === 'vimeo.com') {
    const id = pathParts.find((part) => /^\d+$/.test(part));
    return id || '';
  }
  if (host === 'player.vimeo.com' && pathParts[0] === 'video') {
    return /^\d+$/.test(pathParts[1] || '') ? pathParts[1] : '';
  }
  return '';
}

function extractGoogleDriveId(parsedUrl) {
  const host = parsedUrl.hostname.replace(/^www\./, '').toLowerCase();
  if (host !== 'drive.google.com') return '';
  const match = parsedUrl.pathname.match(/\/file\/d\/([^/]+)/);
  return match ? match[1] : '';
}

export function parseVideoSource(rawUrl) {
  const trimmed = String(rawUrl || '').trim();
  if (!trimmed) {
    return { kind: 'empty', src: '', provider: '', originalUrl: '' };
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(trimmed);
  } catch {
    return { kind: 'invalid', src: '', provider: '', originalUrl: trimmed };
  }

  if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    return { kind: 'invalid', src: '', provider: '', originalUrl: trimmed };
  }

  const ytId = extractYouTubeId(parsedUrl);
  if (ytId) {
    return {
      kind: 'iframe',
      provider: 'YouTube',
      src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(ytId)}?autoplay=1&rel=0`,
      originalUrl: trimmed,
    };
  }

  const vimeoId = extractVimeoId(parsedUrl);
  if (vimeoId) {
    return {
      kind: 'iframe',
      provider: 'Vimeo',
      src: `https://player.vimeo.com/video/${encodeURIComponent(vimeoId)}?autoplay=1`,
      originalUrl: trimmed,
    };
  }

  const driveId = extractGoogleDriveId(parsedUrl);
  if (driveId) {
    return {
      kind: 'iframe',
      provider: 'Google Drive',
      src: `https://drive.google.com/file/d/${encodeURIComponent(driveId)}/preview`,
      originalUrl: trimmed,
    };
  }

  return {
    kind: 'video',
    provider: 'Direct Video',
    src: trimmed,
    originalUrl: trimmed,
  };
}
