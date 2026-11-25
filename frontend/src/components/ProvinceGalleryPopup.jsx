import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProvincePhotos } from '../services/provinceService.js';

export default function ProvinceGalleryPopup({ province, onClose }) {
  const [photos, setPhotos] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!province) return;
    let cancelled = false;
    setIndex(0);
    setLoadError(false);
    setPhotos([]);
    setLoading(true);

    getProvincePhotos(province.id)
      .then((items) => {
        if (!cancelled) {
          setPhotos(Array.isArray(items) ? items : []);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLoadError(true);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [province]);

  useEffect(() => {
    if (!province || photos.length <= 1) return;
    const onKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setIndex((i) => (i - 1 + photos.length) % photos.length);
      } else if (e.key === 'ArrowRight') {
        setIndex((i) => (i + 1) % photos.length);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [province, photos.length]);

  if (!province) return null;

  const current = photos[index];
  const goPrev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);
  const goNext = () => setIndex((i) => (i + 1) % photos.length);

  return (
    <section
      className="province-popup province-gallery-popup"
      role="dialog"
      aria-label={`${province.name} photo gallery`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="popup-header">
        <div>
          <span className="gallery-pill">Gallery</span>
          <h3>{province.name} Photos</h3>
        </div>
        <div className="gallery-header-right">
          {photos.length > 0 && (
            <span className="gallery-counter">
              {index + 1} / {photos.length}
            </span>
          )}
          <button
            type="button"
            className="detail-close-btn"
            onClick={onClose}
            aria-label="Close photo gallery"
          >
            ×
          </button>
        </div>
      </div>

      <div className="gallery-stage">
        {loading ? (
          <div className="gallery-loading-overlay" role="status" aria-live="polite">
            <div className="map-move-loader-badge">
              <div className="map-spinner map-spinner-sm" aria-hidden="true" />
            </div>
            <p className="map-loading-text">Loading photos of {province.name}...</p>
          </div>
        ) : loadError ? (
          <div className="gallery-placeholder">
            Unable to load gallery photos from database.
          </div>
        ) : photos.length === 0 ? (
          <div className="gallery-placeholder gallery-empty-state">
            <p>No gallery photos stored in the database yet for {province.name}.</p>
            <Link
              to={`/admin?province=${encodeURIComponent(province.id)}`}
              className="gallery-manage-link"
            >
              Manage gallery in Admin →
            </Link>
          </div>
        ) : (
          <>
            <img
              key={current.id || current.url}
              src={current.url}
              alt={current.caption || province.name}
              className="gallery-img"
            />
            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  className="gallery-arrow gallery-prev"
                  onClick={goPrev}
                  aria-label="Previous photo"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="gallery-arrow gallery-next"
                  onClick={goNext}
                  aria-label="Next photo"
                >
                  ›
                </button>
              </>
            )}
          </>
        )}
      </div>

      {current && current.caption && <p className="gallery-caption">{current.caption}</p>}

      {photos.length > 1 && (
        <div className="gallery-thumbs" role="tablist" aria-label="Select photo">
          {photos.map((photo, idx) => (
            <button
              key={photo.id || photo.url}
              type="button"
              role="tab"
              aria-selected={idx === index}
              className={`gallery-thumb-btn ${idx === index ? 'active' : ''}`}
              onClick={() => setIndex(idx)}
              aria-label={`View photo ${idx + 1}`}
            >
              <img src={photo.url} alt="" />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
