import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  CircleMarker,
  GeoJSON,
  MapContainer,
  TileLayer,
  useMap,
} from 'react-leaflet';
import { PROVINCE_TO_GEOJSON } from '../lib/geoMappings.js';
import { buildDefaultDescription } from '../services/provinceService.js';
import { isTtsSupported, speakTextHd, stopSpeech } from '../services/ttsService.js';

function FitMiniMapBounds({ bounds, center }) {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
    if (bounds) {
      map.fitBounds(bounds, { padding: [14, 14], animate: false });
    } else if (center) {
      map.setView(center, 7, { animate: false });
    }
  }, [map, bounds, center]);

  return null;
}

function ProvinceMiniMap({ province, geojson, islandColor }) {
  const { feature, bounds } = useMemo(() => {
    if (!province || !geojson?.features?.length) {
      return { feature: null, bounds: null };
    }
    const targetName =
      PROVINCE_TO_GEOJSON[province.id] || province.name.toUpperCase();
    const matched = geojson.features.find((f) => {
      const p = f.properties || {};
      const name = String(
        p.Propinsi || p.name || p.NAME_1 || p.provinsi || ''
      ).toUpperCase();
      return name === targetName;
    });
    if (!matched?.geometry) {
      return { feature: null, bounds: null };
    }

    const polygons =
      matched.geometry.type === 'Polygon'
        ? [matched.geometry.coordinates]
        : matched.geometry.type === 'MultiPolygon'
          ? matched.geometry.coordinates
          : [];
    if (polygons.length === 0) {
      return { feature: matched, bounds: null };
    }

    let minLng = Infinity;
    let maxLng = -Infinity;
    let minLat = Infinity;
    let maxLat = -Infinity;

    for (const poly of polygons) {
      for (const ring of poly) {
        for (const [lng, lat] of ring) {
          if (lng < minLng) minLng = lng;
          if (lng > maxLng) maxLng = lng;
          if (lat < minLat) minLat = lat;
          if (lat > maxLat) maxLat = lat;
        }
      }
    }

    if (!Number.isFinite(minLng)) {
      return { feature: matched, bounds: null };
    }

    return {
      feature: matched,
      bounds: [
        [minLat, minLng],
        [maxLat, maxLng],
      ],
    };
  }, [province, geojson]);

  if (!province) return null;

  const accent = islandColor || '#E56A4A';
  const center = [province.lat, province.lng];

  return (
    <div className="popup-minimap">
      <MapContainer
        key={province.id}
        center={center}
        zoom={7}
        zoomControl={false}
        scrollWheelZoom={false}
        dragging={true}
        doubleClickZoom={true}
        attributionControl={true}
        className="popup-minimap-leaflet"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {feature && (
          <GeoJSON
            key={province.id}
            data={feature}
            style={{
              color: accent,
              weight: 2,
              opacity: 0.95,
              fillColor: accent,
              fillOpacity: 0.2,
            }}
          />
        )}
        <CircleMarker
          center={center}
          radius={5}
          pathOptions={{
            color: '#FFFFFF',
            weight: 2,
            fillColor: accent,
            fillOpacity: 1,
          }}
        />
        <FitMiniMapBounds bounds={bounds} center={center} />
      </MapContainer>
    </div>
  );
}

function getProvinceDescription(province) {
  if (province.description && province.description.trim()) {
    return province.description;
  }
  return buildDefaultDescription(province);
}

const AUTO_PLAY_DELAY_MS = 5000;

export default function ProvincePopup({ province, geojson, islandColor, onClose }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeVoiceName, setActiveVoiceName] = useState('');
  const audioRef = useRef(null);
  const delayTimerRef = useRef(null);

  const ttsSupported = isTtsSupported();

  const stopAudio = useCallback(() => {
    if (delayTimerRef.current) {
      clearTimeout(delayTimerRef.current);
      delayTimerRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    stopSpeech();
    setIsSpeaking(false);
  }, []);

  const speakFallback = useCallback(
    (text) => {
      if (!ttsSupported) {
        setIsSpeaking(false);
        return;
      }
      setIsSpeaking(true);
      speakTextHd(text, {
        onVoiceSelected: (voiceName) => setActiveVoiceName(voiceName),
        onStart: () => setIsSpeaking(true),
        onEnd: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    },
    [ttsSupported]
  );

  const playNarration = useCallback(
    (targetProvince) => {
      stopAudio();
      const text = getProvinceDescription(targetProvince);
      const customAudioUrl = targetProvince.audio_url?.trim();

      if (!customAudioUrl) {
        speakFallback(text);
        return;
      }

      const audio = new Audio(customAudioUrl);
      audioRef.current = audio;
      audio.onplay = () => setIsSpeaking(true);
      audio.onended = () => setIsSpeaking(false);
      audio.onerror = () => {
        if (audioRef.current === audio) {
          audioRef.current = null;
          speakFallback(text);
        }
      };

      setIsSpeaking(true);
      audio.play().catch(() => {
        if (audioRef.current === audio) {
          audioRef.current = null;
          speakFallback(text);
        }
      });
    },
    [speakFallback, stopAudio]
  );

  useEffect(() => {
    stopAudio();
    setActiveVoiceName('');
    if (!province) {
      return;
    }
    delayTimerRef.current = setTimeout(() => {
      delayTimerRef.current = null;
      playNarration(province);
    }, AUTO_PLAY_DELAY_MS);
    return () => {
      stopAudio();
    };
  }, [province, playNarration, stopAudio]);

  if (!province) return null;

  const description = getProvinceDescription(province);
  const density =
    province.area_km2 > 0
      ? (province.population / province.area_km2).toLocaleString('id-ID', {
          maximumFractionDigits: 1,
        })
      : '-';

  const handleClose = () => {
    stopAudio();
    onClose();
  };

  return (
    <section
      className="province-popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-province-title"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="popup-header">
        <div>
          <span
            className="detail-island-tag"
            style={{ backgroundColor: islandColor || '#E56A4A' }}
          >
            {province.island}
          </span>
          <h2 id="popup-province-title">{province.name}</h2>
        </div>
        <button
          type="button"
          className="detail-close-btn"
          onClick={handleClose}
          aria-label="Close province popup"
        >
          ×
        </button>
      </div>

      <ProvinceMiniMap
        province={province}
        geojson={geojson}
        islandColor={islandColor}
      />

      <p className="popup-description">{description}</p>

      <dl className="detail-stats">
        <div className="stat-item">
          <dt>Capital</dt>
          <dd>{province.capital}</dd>
        </div>
        <div className="stat-item">
          <dt>Population</dt>
          <dd>{Number(province.population || 0).toLocaleString('id-ID')}</dd>
        </div>
        <div className="stat-item">
          <dt>Area</dt>
          <dd>{Number(province.area_km2 || 0).toLocaleString('id-ID')} km²</dd>
        </div>
        <div className="stat-item">
          <dt>Density</dt>
          <dd>{density} / km²</dd>
        </div>
      </dl>

      <div className="popup-footer">
        <button
          type="button"
          className={`tts-btn ${isSpeaking ? 'speaking' : ''}`}
          onClick={() => (isSpeaking ? stopAudio() : playNarration(province))}
          title={activeVoiceName ? `HD Voice: ${activeVoiceName}` : 'Play narration'}
        >
          {isSpeaking ? (
            <>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
              <span>Stop Audio</span>
            </>
          ) : (
            <>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
              <span>Listen Audio</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}
