import { Link } from 'react-router-dom';
import { useLanguage } from '../lib/i18n.js';

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
  const { t, translateIsland } = useLanguage();
  const totalProvinces = islands.reduce((sum, item) => sum + item.province_count, 0);

  const density =
    selectedProvince && selectedProvince.area_km2 > 0
      ? (selectedProvince.population / selectedProvince.area_km2).toLocaleString('id-ID', {
          maximumFractionDigits: 1,
        })
      : '-';

  const statusLabel =
    backendStatus === 'online'
      ? t('sidebar.statusLive')
      : backendStatus === 'demo'
        ? t('sidebar.statusDemo')
        : backendStatus === 'offline'
          ? t('sidebar.statusOffline')
          : t('sidebar.statusConnecting');

  return (
    <aside className="sidebar">
      <header className="sidebar-header">
        <div className="header-top">
          <div>
            <h1>
              Indonesia<span className="text-brand-gradient">Ku</span>
            </h1>
            <p className="subtitle">
              {t('sidebar.provincesCount', { count: totalProvinces || provinces.length })}
            </p>
          </div>
          <div className="header-actions">
            {backendStatus === 'demo' ? (
              <button
                type="button"
                className="status-badge status-demo status-clickable"
                onClick={onOpenSetup}
                title={t('sidebar.statusDemoTitle')}
              >
                <span className="status-dot" />
                {statusLabel}
              </button>
            ) : (
              <span
                className={`status-badge status-${backendStatus}`}
                title={t('sidebar.statusLiveTitle')}
              >
                <span className="status-dot" />
                {statusLabel}
              </span>
            )}
            <Link
              to="/admin"
              className="sidebar-admin-link"
              title={t('map.openAdminTitle')}
              aria-label={t('map.openAdminTitle')}
            >
              {t('map.admin')}
            </Link>
            <button
              type="button"
              className={`pin-btn ${pinned ? 'active' : ''}`}
              onClick={onTogglePin}
              title={pinned ? t('sidebar.unpinMenu') : t('sidebar.pinMenu')}
              aria-label={pinned ? t('sidebar.unpinMenu') : t('sidebar.pinMenu')}
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
            placeholder={t('sidebar.searchPlaceholder')}
            aria-label={t('sidebar.searchAria')}
          />
          {searchInput && (
            <button
              type="button"
              className="clear-input-btn"
              onClick={() => onSearchChange('')}
              aria-label={t('sidebar.clearSearch')}
            >
              ×
            </button>
          )}
        </div>
      </header>

      {error && (
        <div className="error-banner" role="alert">
          <div className="error-title">{t('sidebar.errorTitle')}</div>
          <p>{error}</p>
          <p className="error-hint">
            {t('sidebar.errorHintPre')} <code>frontend/.env</code> {t('sidebar.errorHintPost')}
          </p>
          <div className="error-actions">
            <button type="button" className="retry-btn" onClick={onRetry}>
              {t('sidebar.retryConnection')}
            </button>
            <button type="button" className="setup-link-btn" onClick={onOpenSetup}>
              {t('sidebar.setupGuide')}
            </button>
          </div>
        </div>
      )}

      {islands.length > 0 && (
        <section className="island-filters" aria-label={t('sidebar.islandFiltersAria')}>
          <button
            type="button"
            className={`island-chip ${selectedIsland === '' ? 'active' : ''}`}
            onClick={() => onSelectIsland('')}
          >
            <span>{t('sidebar.all')}</span>
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
                <span>{translateIsland(group.name)}</span>
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
              <span>{t('sidebar.loadingDetails')}</span>
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
                      {translateIsland(selectedProvince.island)}
                    </span>
                    <h2>{selectedProvince.name}</h2>
                  </div>
                  <button
                    type="button"
                    className="detail-close-btn"
                    onClick={onClearSelection}
                    aria-label={t('sidebar.closeDetails')}
                  >
                    ×
                  </button>
                </div>

                <dl className="detail-stats">
                  <div className="stat-item">
                    <dt>{t('sidebar.capital')}</dt>
                    <dd>{selectedProvince.capital}</dd>
                  </div>
                  <div className="stat-item">
                    <dt>{t('sidebar.population')}</dt>
                    <dd>{Number(selectedProvince.population || 0).toLocaleString('id-ID')}</dd>
                  </div>
                  <div className="stat-item">
                    <dt>{t('sidebar.area')}</dt>
                    <dd>{Number(selectedProvince.area_km2 || 0).toLocaleString('id-ID')} km²</dd>
                  </div>
                  <div className="stat-item">
                    <dt>{t('sidebar.density')}</dt>
                    <dd>{density} / km²</dd>
                  </div>
                </dl>
              </>
            )
          )}
        </section>
      )}

      <div className="list-header">
        <span>{t('sidebar.listTitle')}</span>
        <span className="list-count">{t('sidebar.listCount', { count: provinces.length })}</span>
      </div>

      <ul className="province-list">
        {provinces.length === 0 && !error ? (
          <li className="empty-list">{t('sidebar.emptyList')}</li>
        ) : (
          provinces.map((province) => {
            const isSelected = selectedProvince?.id === province.id;
            const color = islandColors[province.island] || '#0284c7';
            return (
              <li key={province.id}>
                <button
                  type="button"
                  className={`province-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => onSelectProvince(province.id, { fly: false, openPopup: false })}
                  title={t('sidebar.locateTitle')}
                >
                  <span className="province-dot" style={{ backgroundColor: color }} />
                  <div className="province-item-text">
                    <div className="province-name">{province.name}</div>
                    <div className="province-meta">
                      {province.capital} · {translateIsland(province.island)}
                    </div>
                  </div>
                  <div className="province-pop">
                    {(Number(province.population || 0) / 1_000_000).toFixed(1)}
                    {t('sidebar.popMillion')}
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
