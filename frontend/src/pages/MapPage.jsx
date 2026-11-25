import { useCallback, useEffect, useRef, useState } from 'react';
import { ISLAND_COLORS } from '../lib/geoMappings.js';
import {
  checkHealth,
  getGeoJSON,
  getIslands,
  getProvince,
  getProvinces,
} from '../services/provinceService.js';
import CapitalVideoPopup from '../components/CapitalVideoPopup.jsx';
import MapView from '../components/MapView.jsx';
import ProvinceGalleryPopup from '../components/ProvinceGalleryPopup.jsx';
import ProvincePopup from '../components/ProvincePopup.jsx';
import Sidebar from '../components/Sidebar.jsx';
import SupabaseSetupModal from '../components/SupabaseSetupModal.jsx';

export default function MapPage({ theme, onToggleTheme }) {
  const [provinces, setProvinces] = useState([]);
  const [islands, setIslands] = useState([]);
  const [geojson, setGeojson] = useState(null);
  const [selectedIsland, setSelectedIsland] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [popupProvince, setPopupProvince] = useState(null);
  const [videoProvince, setVideoProvince] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking');
  const [initialLoading, setInitialLoading] = useState(true);
  const [geojsonLoaded, setGeojsonLoaded] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [error, setError] = useState('');
  const [setupOpen, setSetupOpen] = useState(false);
  const [resetNonce, setResetNonce] = useState(0);
  const [flyNonce, setFlyNonce] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const hasSkippedInitialFilterRef = useRef(false);
  const resetTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchInput.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const loadInitialData = useCallback(async () => {
    setInitialLoading(true);
    setBackendStatus('checking');
    setError('');
    try {
      const health = await checkHealth();
      setBackendStatus(health.status);
      const [islandData, geoData, initialProvinces] = await Promise.all([
        getIslands(),
        getGeoJSON().catch(() => null),
        getProvinces({ island: '', q: '' }),
      ]);
      setIslands(islandData);
      setGeojson(geoData);
      setProvinces(initialProvinces);
    } catch (err) {
      setBackendStatus('offline');
      setError(err.message || 'Unable to connect to Supabase database.');
    } finally {
      setGeojsonLoaded(true);
      setInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  useEffect(() => {
    if (!hasSkippedInitialFilterRef.current) {
      hasSkippedInitialFilterRef.current = true;
      return;
    }
    let cancelled = false;
    async function fetchFilteredProvinces() {
      try {
        const list = await getProvinces({
          island: selectedIsland,
          q: debouncedQuery,
        });
        if (!cancelled) {
          setProvinces(list);
          setBackendStatus((prev) => (prev === 'demo' ? 'demo' : 'online'));
          setError('');
        }
      } catch (err) {
        if (!cancelled) {
          setBackendStatus('offline');
          setError(err.message || 'Failed to load provinces from Supabase.');
        }
      }
    }
    fetchFilteredProvinces();
    return () => {
      cancelled = true;
    };
  }, [selectedIsland, debouncedQuery]);

  const handleSelectProvince = useCallback(async (id, { fly = true, openPopup = false } = {}) => {
    setDetailLoading(true);
    try {
      const detail = await getProvince(id);
      setSelectedProvince(detail);
      setVideoProvince(null);
      setBackendStatus((prev) => (prev === 'demo' ? 'demo' : 'online'));
      if (openPopup) {
        setPopupProvince(detail);
      } else {
        setPopupProvince(null);
        setSidebarOpen(true);
      }
      if (fly) {
        setFlyNonce((n) => n + 1);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch province details.');
    } finally {
      setDetailLoading(false);
    }
  }, []);

  const handleSelectCapital = useCallback(async (id) => {
    setDetailLoading(true);
    try {
      const detail = await getProvince(id);
      setSelectedProvince(detail);
      setPopupProvince(null);
      setVideoProvince(detail);
      setBackendStatus((prev) => (prev === 'demo' ? 'demo' : 'online'));
    } catch (err) {
      setError(err.message || 'Failed to fetch capital video.');
    } finally {
      setDetailLoading(false);
    }
  }, []);

  const handleClearSelection = useCallback(() => {
    setSelectedProvince(null);
  }, []);

  const handleResetView = useCallback(() => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }
    setResetting(true);
    setSelectedProvince(null);
    setPopupProvince(null);
    setVideoProvince(null);
    setSelectedIsland('');
    setSearchInput('');
    setDebouncedQuery('');
    setResetNonce((n) => n + 1);
    resetTimerRef.current = setTimeout(() => {
      resetTimerRef.current = null;
      setResetting(false);
    }, 550);
  }, []);

  return (
    <div className="app-shell">
      <main className="map-main">
        <MapView
          provinces={provinces}
          selectedProvince={selectedProvince}
          selectedIsland={selectedIsland}
          onSelectProvince={handleSelectProvince}
          onSelectCapital={handleSelectCapital}
          geojson={geojson}
          geojsonLoaded={geojsonLoaded}
          loading={initialLoading}
          resetting={resetting}
          islandColors={ISLAND_COLORS}
          resetNonce={resetNonce}
          flyNonce={flyNonce}
          onResetView={handleResetView}
          theme={theme}
          onToggleTheme={onToggleTheme}
        />
      </main>

      <div
        className={`sidebar-shell ${sidebarOpen || sidebarPinned ? 'open' : ''}`}
        onMouseEnter={() => setSidebarOpen(true)}
        onMouseLeave={() => setSidebarOpen(false)}
      >
        <Sidebar
          provinces={provinces}
          islands={islands}
          selectedIsland={selectedIsland}
          onSelectIsland={setSelectedIsland}
          searchInput={searchInput}
          onSearchChange={setSearchInput}
          selectedProvince={selectedProvince}
          detailLoading={detailLoading}
          onSelectProvince={handleSelectProvince}
          onClearSelection={handleClearSelection}
          backendStatus={backendStatus}
          error={error}
          onRetry={loadInitialData}
          islandColors={ISLAND_COLORS}
          pinned={sidebarPinned}
          onTogglePin={() => setSidebarPinned((p) => !p)}
          onOpenSetup={() => setSetupOpen(true)}
        />
        <button
          type="button"
          className="sidebar-handle"
          onClick={() => setSidebarPinned((p) => !p)}
          title={sidebarPinned ? 'Unpin menu' : 'Pin menu open'}
          aria-label="Toggle menu"
        >
          {sidebarPinned ? '‹' : '☰'}
        </button>
      </div>

      {popupProvince && (
        <div
          className="province-popups-backdrop"
          onClick={() => setPopupProvince(null)}
          role="presentation"
        >
          <ProvincePopup
            province={popupProvince}
            geojson={geojson}
            islandColor={ISLAND_COLORS[popupProvince.island]}
            onClose={() => setPopupProvince(null)}
          />
          <ProvinceGalleryPopup
            province={popupProvince}
            onClose={() => setPopupProvince(null)}
          />
        </div>
      )}

      {videoProvince && (
        <div
          className="province-popups-backdrop"
          onClick={() => setVideoProvince(null)}
          role="presentation"
        >
          <CapitalVideoPopup
            province={videoProvince}
            islandColor={ISLAND_COLORS[videoProvince.island]}
            onClose={() => setVideoProvince(null)}
          />
        </div>
      )}

      <SupabaseSetupModal open={setupOpen} onClose={() => setSetupOpen(false)} />
    </div>
  );
}
