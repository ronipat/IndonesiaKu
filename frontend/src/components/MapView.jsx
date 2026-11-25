import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CircleMarker,
  GeoJSON,
  MapContainer,
  Pane,
  TileLayer,
  Tooltip,
  useMap,
} from 'react-leaflet';
import {
  GEOJSON_TO_ISLAND,
  GEOJSON_TO_PRIMARY_PROVINCE,
  PROVINCE_TO_GEOJSON,
} from '../lib/geoMappings.js';

const INDONESIA_CENTER = [-2.5, 118];
const DEFAULT_ZOOM = 5;
const INDONESIA_BOUNDS = [
  [-11.5, 94.5],
  [6.5, 141.5],
];

const GEO_STYLES = {
  light: {
    base: { color: '#D4A893', weight: 1.0, opacity: 1, fillColor: '#FFFFFF', fillOpacity: 1 },
    hover: { color: '#E56A4A', weight: 1.7, opacity: 1, fillColor: '#FFD6C4', fillOpacity: 1 },
    selected: { color: '#CC4B2A', weight: 2.2, opacity: 1, fillColor: '#F7B299', fillOpacity: 1 },
  },
  dark: {
    base: { color: '#526071', weight: 1.1, opacity: 1, fillColor: '#242D3A', fillOpacity: 1 },
    hover: { color: '#E56A4A', weight: 1.7, opacity: 1, fillColor: '#4A2B24', fillOpacity: 1 },
    selected: { color: '#F07B5B', weight: 2.2, opacity: 1, fillColor: '#613328', fillOpacity: 1 },
  },
  cartoon: {
    base: { color: '#18181B', weight: 2.2, opacity: 1, fillColor: '#A7F3D0', fillOpacity: 1 },
    hover: { color: '#18181B', weight: 2.8, opacity: 1, fillColor: '#FDE047', fillOpacity: 1 },
    selected: { color: '#18181B', weight: 3.2, opacity: 1, fillColor: '#FB923C', fillOpacity: 1 },
  },
};

function FitIndonesia() {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(INDONESIA_BOUNDS);
  }, [map]);

  return null;
}

function FlyToSelected({ selectedProvince, flyNonce, resetNonce }) {
  const map = useMap();
  const lastFlyNonceRef = useRef(0);

  useEffect(() => {
    if (flyNonce > 0 && flyNonce !== lastFlyNonceRef.current && selectedProvince) {
      lastFlyNonceRef.current = flyNonce;
      map.flyTo([selectedProvince.lat, selectedProvince.lng], 7, {
        duration: 1.25,
        easeLinearity: 0.4,
      });
    }
  }, [map, flyNonce, selectedProvince]);

  useEffect(() => {
    if (resetNonce > 0) {
      map.flyToBounds(INDONESIA_BOUNDS, {
        duration: 0.55,
        easeLinearity: 0.4,
      });
    }
  }, [map, resetNonce]);

  return null;
}

function MapMovementTracker({ onMovingChange }) {
  const map = useMap();

  useEffect(() => {
    let isReady = false;
    let endTimer = null;

    const readyTimer = setTimeout(() => {
      isReady = true;
    }, 300);

    const handleMoveStart = () => {
      if (!isReady) return;
      if (endTimer) {
        clearTimeout(endTimer);
        endTimer = null;
      }
      onMovingChange(true);
    };

    const handleMoveEnd = () => {
      if (!isReady) return;
      if (endTimer) {
        clearTimeout(endTimer);
      }
      endTimer = setTimeout(() => {
        endTimer = null;
        onMovingChange(false);
      }, 140);
    };

    map.on('movestart zoomstart', handleMoveStart);
    map.on('moveend zoomend', handleMoveEnd);

    return () => {
      clearTimeout(readyTimer);
      if (endTimer) clearTimeout(endTimer);
      map.off('movestart zoomstart', handleMoveStart);
      map.off('moveend zoomend', handleMoveEnd);
      onMovingChange(false);
    };
  }, [map, onMovingChange]);

  return null;
}

function getMarkerRadius(population) {
  return Math.max(3, Math.min(9, 3 + Math.sqrt(population || 0) / 900));
}

function getFeatureName(feature) {
  const props = feature?.properties || {};
  return props.Propinsi || props.name || props.NAME_1 || props.provinsi || 'Province Boundary';
}

function getFeatureKey(feature) {
  const p = feature?.properties || {};
  return String(p.ID ?? p.kode ?? getFeatureName(feature));
}

export default function MapView({
  provinces,
  selectedProvince,
  selectedIsland = '',
  onSelectProvince,
  onSelectCapital,
  geojson,
  geojsonLoaded = false,
  loading = false,
  resetting = false,
  islandColors,
  resetNonce,
  flyNonce,
  onResetView,
  theme = 'light',
  onToggleTheme,
}) {
  const [isMoving, setIsMoving] = useState(false);
  const isDark = theme === 'dark';
  const isCartoon = theme === 'cartoon';
  const themeRef = useRef(theme);
  themeRef.current = theme;
  const selectedIslandRef = useRef(selectedIsland);
  selectedIslandRef.current = selectedIsland;
  const selectedKeyRef = useRef(null);
  const selectedLayerRef = useRef(null);
  const layersByNameRef = useRef({});
  const allLayersRef = useRef(new Map());

  const getPolygonStyle = (featureName, isSelected, activeTheme, activeIsland) => {
    const styles = GEO_STYLES[activeTheme] || GEO_STYLES.light;
    if (isSelected) {
      return styles.selected;
    }
    if (!activeIsland) {
      return styles.base;
    }
    const featureIsland = GEOJSON_TO_ISLAND[String(featureName).toUpperCase()];
    if (featureIsland === activeIsland) {
      const islandColor = islandColors[activeIsland] || '#E56A4A';
      if (activeTheme === 'cartoon') {
        return {
          color: '#18181B',
          weight: 2.6,
          opacity: 1,
          fillColor: islandColor,
          fillOpacity: 0.72,
        };
      }
      return {
        color: islandColor,
        weight: 1.6,
        opacity: 0.95,
        fillColor: islandColor,
        fillOpacity: activeTheme === 'dark' ? 0.34 : 0.24,
      };
    }
    return {
      ...styles.base,
      opacity: 0.4,
      fillOpacity: activeTheme === 'cartoon' ? 0.45 : 0.35,
    };
  };

  useEffect(() => {
    const targetName = selectedProvince
      ? PROVINCE_TO_GEOJSON[selectedProvince.id] || selectedProvince.name.toUpperCase()
      : null;
    const match = targetName ? layersByNameRef.current[targetName] : null;

    if (selectedProvince && match) {
      selectedKeyRef.current = match.key;
      selectedLayerRef.current = match.layer;
    } else if (!selectedProvince) {
      selectedKeyRef.current = null;
      selectedLayerRef.current = null;
    }

    allLayersRef.current.forEach((featureName, layer) => {
      const isSelected = layer === selectedLayerRef.current;
      layer.setStyle(getPolygonStyle(featureName, isSelected, theme, selectedIsland));
    });
  }, [selectedProvince, selectedIsland, theme, geojson]);

  useEffect(() => {
    if (resetNonce > 0) {
      const prevLayer = selectedLayerRef.current;
      selectedLayerRef.current = null;
      selectedKeyRef.current = null;
      if (prevLayer) {
        const featureName = allLayersRef.current.get(prevLayer) || '';
        prevLayer.setStyle(
          getPolygonStyle(featureName, false, themeRef.current, selectedIslandRef.current)
        );
      }
    }
  }, [resetNonce]);

  const onEachFeature = (feature, layer) => {
    const label = getFeatureName(feature);
    const upperName = String(label).toUpperCase();
    const key = getFeatureKey(feature);
    allLayersRef.current.set(layer, upperName);
    layersByNameRef.current[upperName] = { key, layer };
    if (key === selectedKeyRef.current) {
      selectedLayerRef.current = layer;
    }

    layer.bindTooltip(String(label), {
      sticky: true,
      direction: 'top',
      opacity: 0.96,
      className: 'map-tooltip',
    });

    layer.on({
      mouseover: (e) => {
        if (key !== selectedKeyRef.current) {
          const activeStyle = GEO_STYLES[themeRef.current] || GEO_STYLES.light;
          e.target.setStyle(activeStyle.hover);
        }
      },
      mouseout: (e) => {
        if (key !== selectedKeyRef.current) {
          e.target.setStyle(
            getPolygonStyle(upperName, false, themeRef.current, selectedIslandRef.current)
          );
        }
      },
      click: (e) => {
        const activeStyle = GEO_STYLES[themeRef.current] || GEO_STYLES.light;
        const prev = selectedLayerRef.current;
        if (selectedKeyRef.current === key) {
          selectedKeyRef.current = null;
          selectedLayerRef.current = null;
          e.target.setStyle(activeStyle.hover);
          return;
        }
        if (prev && prev !== e.target) {
          const prevName = allLayersRef.current.get(prev) || '';
          prev.setStyle(
            getPolygonStyle(prevName, false, themeRef.current, selectedIslandRef.current)
          );
        }
        selectedKeyRef.current = key;
        selectedLayerRef.current = e.target;
        e.target.setStyle(activeStyle.selected);

        const matchedId = GEOJSON_TO_PRIMARY_PROVINCE[upperName];
        if (matchedId) {
          onSelectProvince(matchedId, { fly: false, openPopup: true });
        }
      },
    });
  };

  return (
    <div className="map-wrapper">
      {loading ? (
        <div className="map-loading-screen" role="status" aria-live="polite">
          <div className="map-move-loader-badge">
            <div className="map-spinner map-spinner-sm" aria-hidden="true" />
          </div>
          <p className="map-loading-text">Loading IndonesiaKu...</p>
        </div>
      ) : (
        <>
          <MapContainer
            center={INDONESIA_CENTER}
            zoom={DEFAULT_ZOOM}
            minZoom={3.5}
            maxZoom={12}
            zoomSnap={0.5}
            zoomDelta={0.5}
            wheelPxPerZoomLevel={90}
            maxBounds={[
              [-14, 92],
              [9, 144],
            ]}
            maxBoundsViscosity={0.5}
            className="leaflet-container-full"
            scrollWheelZoom={true}
          >
            {geojsonLoaded && !geojson && (
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            )}

        {geojson && (
          <Pane name="boundaries" style={{ zIndex: 350 }}>
            <GeoJSON
              key={`geojson-${geojson.features?.length || 0}`}
              data={geojson}
              style={(feature) =>
                getPolygonStyle(
                  getFeatureName(feature),
                  getFeatureKey(feature) === selectedKeyRef.current,
                  theme,
                  selectedIsland
                )
              }
              onEachFeature={onEachFeature}
            />
          </Pane>
        )}

        <Pane name="markers" style={{ zIndex: 450 }}>
          {provinces.map((province) => {
            const isSelected = selectedProvince?.id === province.id;
            const color = islandColors[province.island] || '#0284c7';
            const radius = getMarkerRadius(province.population);

            return (
              <CircleMarker
                key={province.id}
                center={[province.lat, province.lng]}
                radius={isSelected ? radius + 2 : radius}
                pathOptions={{
                  color: isCartoon
                    ? '#18181B'
                    : isSelected
                      ? isDark
                        ? '#FFFFFF'
                        : '#0A0A0A'
                      : isDark
                        ? '#1A1A1A'
                        : '#FFFFFF',
                  weight: isCartoon ? (isSelected ? 3 : 2) : isSelected ? 2 : 1.5,
                  fillColor: color,
                  fillOpacity: isCartoon ? 1 : isSelected ? 1 : 0.9,
                }}
                eventHandlers={{
                  click: (e) => {
                    e?.originalEvent?.stopPropagation?.();
                    onSelectCapital?.(province.id);
                  },
                }}
              >
                <Tooltip direction="top" offset={[0, -4]} opacity={0.98} className="map-tooltip">
                  <strong>{province.capital}</strong>
                  <div className="tooltip-sub">
                    Capital of {province.name}
                    {province.video_url ? ' · ▶ Watch video' : ' · Click for video'}
                  </div>
                </Tooltip>
              </CircleMarker>
            );
          })}
        </Pane>

        <FitIndonesia />
        <FlyToSelected
          selectedProvince={selectedProvince}
          flyNonce={flyNonce}
          resetNonce={resetNonce}
        />
        <MapMovementTracker onMovingChange={setIsMoving} />
      </MapContainer>

      <div className="map-overlay-controls">
        <Link to="/admin" className="admin-nav-btn" title="Open Admin CMS">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
          <span>Admin</span>
        </Link>
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={
            theme === 'light'
              ? 'Switch to dark theme'
              : theme === 'dark'
                ? 'Switch to cartoon theme'
                : 'Switch to light theme'
          }
          title={
            theme === 'light'
              ? 'Switch to dark theme'
              : theme === 'dark'
                ? 'Switch to cartoon theme'
                : 'Switch to light theme'
          }
        >
          {theme === 'cartoon' ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          ) : theme === 'dark' ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          )}
        </button>
        <button
          type="button"
          className="reset-view-btn"
          onClick={onResetView}
          disabled={resetting}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          <span>Reset All</span>
        </button>
      </div>

      <div className="map-hero">
        <span className="hero-pill">🇮🇩 IndonesiaKu</span>
        <span className="map-hero-title">
          Explore <span className="text-brand-gradient">Indonesia</span>
        </span>
        <span className="map-hero-sub">{provinces.length} provinces</span>
      </div>

      <div className="map-legend">
        <div className="legend-title">Island groups</div>
        <div className="legend-items">
          {Object.entries(islandColors).map(([island, color]) => (
            <div key={island} className="legend-item">
              <span className="legend-dot" style={{ backgroundColor: color }} />
              <span>{island}</span>
            </div>
          ))}
        </div>
            <div className="legend-note">Circle size ≈ population</div>
          </div>

          {resetting && (
            <div className="map-action-loader" role="status" aria-live="polite">
              <div className="map-move-loader-badge">
                <div className="map-spinner map-spinner-sm" aria-hidden="true" />
              </div>
              <p className="map-loading-text">Resetting map...</p>
            </div>
          )}

          {isMoving && !resetting && (
            <div
              className="map-move-loader"
              role="status"
              aria-live="polite"
              aria-label="Updating map view"
            >
              <div className="map-move-loader-badge">
                <div className="map-spinner map-spinner-sm" aria-hidden="true" />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
