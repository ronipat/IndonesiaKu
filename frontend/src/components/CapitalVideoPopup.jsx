import { useEffect, useRef, useState } from 'react';
import { parseVideoSource } from '../utils/videoUrl.js';

const VIDEO_AUTOPLAY_DELAY_MS = 5000;

export default function CapitalVideoPopup({ province, islandColor, onClose }) {
  const [mediaError, setMediaError] = useState(false);
  const [readyToPlay, setReadyToPlay] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(
    Math.ceil(VIDEO_AUTOPLAY_DELAY_MS / 1000)
  );
  const timersRef = useRef({ intervalId: null, timeoutId: null });

  const parsed = province
    ? parseVideoSource(province.video_url)
    : { kind: 'empty', src: '', provider: '', originalUrl: '' };

  const clearTimers = () => {
    if (timersRef.current.intervalId) {
      clearInterval(timersRef.current.intervalId);
      timersRef.current.intervalId = null;
    }
    if (timersRef.current.timeoutId) {
      clearTimeout(timersRef.current.timeoutId);
      timersRef.current.timeoutId = null;
    }
  };

  useEffect(() => {
    clearTimers();
    setMediaError(false);

    if (parsed.kind !== 'iframe' && parsed.kind !== 'video') {
      setReadyToPlay(false);
      return undefined;
    }

    setReadyToPlay(false);
    setSecondsLeft(Math.ceil(VIDEO_AUTOPLAY_DELAY_MS / 1000));

    timersRef.current.intervalId = setInterval(() => {
      setSecondsLeft((prev) => Math.max(1, prev - 1));
    }, 1000);

    timersRef.current.timeoutId = setTimeout(() => {
      clearTimers();
      setReadyToPlay(true);
    }, VIDEO_AUTOPLAY_DELAY_MS);

    return () => {
      clearTimers();
    };
  }, [province?.id, province?.video_url, parsed.kind]);

  useEffect(() => {
    if (!province) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [province, onClose]);

  if (!province) return null;

  const canOpenExternal =
    parsed.originalUrl.startsWith('http://') ||
    parsed.originalUrl.startsWith('https://');

  const handlePlayNow = () => {
    clearTimers();
    setReadyToPlay(true);
  };

  return (
    <section
      className="province-popup capital-video-popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="capital-video-title"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="popup-header video-popup-header">
        <div className="video-header-main">
          <span
            className="detail-island-tag"
            style={{ backgroundColor: islandColor || '#E56A4A' }}
          >
            {province.island}
          </span>
          <h2 id="capital-video-title">{province.capital}</h2>
          <span className="video-popup-sub">· Capital of {province.name}</span>
          {parsed.provider && (
            <span className="video-provider-badge">{parsed.provider}</span>
          )}
        </div>
        <button
          type="button"
          className="detail-close-btn"
          onClick={onClose}
          aria-label="Close capital video player"
        >
          ×
        </button>
      </div>

      <div className="video-player-stage">
        {parsed.kind === 'empty' ? (
          <div className="video-empty-state">
            <p className="video-empty-title">
              No video configured yet for {province.capital}.
            </p>
            <p className="video-empty-hint">
              Add a video link (YouTube, Vimeo, or MP4) in the Admin page.
            </p>
          </div>
        ) : parsed.kind === 'invalid' || mediaError ? (
          <div className="video-empty-state">
            <p className="video-empty-title">
              {mediaError
                ? `Unable to play video directly for ${province.capital}.`
                : 'Invalid video link configured.'}
            </p>
            <p className="video-empty-hint">
              Update the Capital Video URL in Admin with a YouTube, Vimeo, Google Drive, or direct MP4 link.
            </p>
            {canOpenExternal && (
              <a
                href={parsed.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="video-external-link"
              >
                Open Video Link ↗
              </a>
            )}
          </div>
        ) : !readyToPlay ? (
          <div className="video-countdown-overlay" role="status" aria-live="polite">
            <div className="map-move-loader-badge">
              <div className="map-spinner map-spinner-sm" aria-hidden="true" />
            </div>
            <p className="video-countdown-text">
              Starting video in {secondsLeft}s...
            </p>
            <button
              type="button"
              className="video-play-now-btn"
              onClick={handlePlayNow}
            >
              Play Now
            </button>
          </div>
        ) : parsed.kind === 'iframe' ? (
          <iframe
            key={parsed.src}
            src={parsed.src}
            title={`${province.capital} video`}
            className="video-player-iframe"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <video
            key={parsed.src}
            src={parsed.src}
            controls
            autoPlay
            playsInline
            className="video-player-element"
            onError={() => setMediaError(true)}
          />
        )}
      </div>

      <div className="video-popup-footer">
        <span className="video-footer-meta">
          {province.capital} · {province.name}
        </span>
        {canOpenExternal && (
          <a
            href={parsed.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="video-external-link"
          >
            Open Original ↗
          </a>
        )}
      </div>
    </section>
  );
}
