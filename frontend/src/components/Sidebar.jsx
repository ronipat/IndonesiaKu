import { Link } from 'react-router-dom';

export default function Sidebar({
  provinces,
  islands,
  selectedIsland,
  onSelectIsland,
  searchInput,
  onSearchChange,
  selectedProvince,
  detailLoading,
  onSelectProvince,
  onClearSelection,
  backendStatus,
  error,
  onRetry,
  islandColors,
  pinned,
  onTogglePin,
  onOpenSetup,
}) {
  const totalProvinces = islands.reduce((sum, item) => sum + item.province_count, 0);

  const density =
    selectedProvince && selectedProvince.area_km2 > 0
      ? (selectedProvince.population / selectedProvince.area_km2).toLocaleString('id-ID', {
          maximumFractionDigits: 1,
        })
      : '-';

  const statusLabel =
    backendStatus === 'online'
      ? 'Supabase Live'
      : backendStatus === 'demo'
        ? 'Demo Mode'
        : backendStatus === 'offline'
          ? 'DB Offline'
          : 'Connecting';

  return (
    <aside className="sidebar">
      <header className="sidebar-header">
        <div className="header-top">
          <div>
            <h1>
              Indonesia<span className="text-brand-gradient">Ku</span>
            </h1>
            <p className="subtitle">{totalProvinces || provinces.length} Provinces</p>
          </div>
          <div className="header-actions">
            {backendStatus === 'demo' ? (
              <button
                type="button"
                className="status-badge status-demo status-clickable"
                onClick={onOpenSetup}
                title="Click for Supabase setup instructions"
              >
                <span className="status-dot" />
                {statusLabel}
              </button>
            ) : (
              <span
                className={`status-badge status-${backendStatus}`}
                title="Supabase database connection status"
              >
                <span className="status-dot" />
                {statusLabel}
              </span>
            )}
            <Link
              to="/admin"
              className="sidebar-admin-link"
              title="Open Admin CMS"
              aria-label="Open Admin CMS"
            >
              Admin
            </Link>
            <button
              type="button"
              className={`pin-btn ${pinned ? 'active' : ''}`}
              onClick={onTogglePin}
              title={pinned ? 'Unpin menu' : 'Pin menu open'}
              aria-label={pinned ? 'Unpin menu' : 'Pin menu open'}
            >
              📌
            </button>
          </div>
        </div>

        <div className="search-box">
          <svg
            className="search-icon"
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
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search province or capital..."
            aria-label="Search province or capital"
          />
          {searchInput && (
            <button
              type="button"
              className="clear-input-btn"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </header>

      {error && (
        <div className="error-banner" role="alert">
          <div className="error-title">Supabase unreachable</div>
          <p>{error}</p>
          <p className="error-hint">
            Check <code>frontend/.env</code> keys and ensure your Supabase SQL migrations ran.
          </p>
          <div className="error-actions">
            <button type="button" className="retry-btn" onClick={onRetry}>
              Retry Connection
            </button>
            <button type="button" className="setup-link-btn" onClick={onOpenSetup}>
              Setup Guide
            </button>
          </div>
        </div>
      )}

      {islands.length > 0 && (
        <section className="island-filters" aria-label="Filter by island group">
          <button
            type="button"
            className={`island-chip ${selectedIsland === '' ? 'active' : ''}`}
            onClick={() => onSelectIsland('')}
          >
            <span>All</span>
            <span className="chip-count">{totalProvinces}</span>
          </button>
          {islands.map((group) => {
            const active = selectedIsland === group.name;
            const color = islandColors[group.name] || '#0284c7';
            return (
              <button
                key={group.name}
                type="button"
                className={`island-chip ${active ? 'active' : ''}`}
                onClick={() => onSelectIsland(active ? '' : group.name)}
              >
                <span className="chip-dot" style={{ backgroundColor: color }} />
                <span>{group.name}</span>
                <span className="chip-count">{group.province_count}</span>
              </button>
            );
          })}
        </section>
      )}

      {(selectedProvince || detailLoading) && (
        <section className="detail-card" aria-live="polite">
          {detailLoading && !selectedProvince ? (
            <div className="detail-loading" role="status" aria-live="polite">
              <div className="map-spinner map-spinner-sm" aria-hidden="true" />
              <span>Loading province details...</span>
            </div>
          ) : (
            selectedProvince && (
              <>
                <div className="detail-header">
                  <div>
                    <span
                      className="detail-island-tag"
                      style={{ backgroundColor: islandColors[selectedProvince.island] || '#0284c7' }}
                    >
                      {selectedProvince.island}
                    </span>
                    <h2>{selectedProvince.name}</h2>
                  </div>
                  <button
                    type="button"
                    className="detail-close-btn"
                    onClick={onClearSelection}
                    aria-label="Close province details"
                  >
                    ×
                  </button>
                </div>

                <dl className="detail-stats">
                  <div className="stat-item">
                    <dt>Capital</dt>
                    <dd>{selectedProvince.capital}</dd>
                  </div>
                  <div className="stat-item">
                    <dt>Population</dt>
                    <dd>{Number(selectedProvince.population || 0).toLocaleString('id-ID')}</dd>
                  </div>
                  <div className="stat-item">
                    <dt>Area</dt>
                    <dd>{Number(selectedProvince.area_km2 || 0).toLocaleString('id-ID')} km²</dd>
                  </div>
                  <div className="stat-item">
                    <dt>Density</dt>
                    <dd>{density} / km²</dd>
                  </div>
                </dl>
              </>
            )
          )}
        </section>
      )}

      <div className="list-header">
        <span>Provinces</span>
        <span className="list-count">{provinces.length} shown</span>
      </div>

      <ul className="province-list">
        {provinces.length === 0 && !error ? (
          <li className="empty-list">No provinces match your filter.</li>
        ) : (
          provinces.map((province) => {
            const isSelected = selectedProvince?.id === province.id;
            const color = islandColors[province.island] || '#0284c7';
            return (
              <li key={province.id}>
                <button
                  type="button"
                  className={`province-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => onSelectProvince(province.id, { fly: true, openPopup: false })}
                  title="Click to locate on map"
                >
                  <span className="province-dot" style={{ backgroundColor: color }} />
                  <div className="province-item-text">
                    <div className="province-name">{province.name}</div>
                    <div className="province-meta">
                      {province.capital} · {province.island}
                    </div>
                  </div>
                  <div className="province-pop">
                    {(Number(province.population || 0) / 1_000_000).toFixed(1)}M
                  </div>
                </button>
              </li>
            );
          })
        )}
      </ul>
    </aside>
  );
}
