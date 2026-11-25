import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../lib/i18n.js';
import { ISLAND_COLORS, ISLAND_LIST } from '../../lib/geoMappings.js';
import { isSupabaseConfigured } from '../../lib/supabase.js';
import {
  listAdminProvinces,
  listProvincePhotos,
  resetDemoData,
  updateProvince,
} from '../../services/adminService.js';
import { buildDefaultDescription } from '../../services/provinceService.js';
import { isTtsSupported, speakTextHd, stopSpeech } from '../../services/ttsService.js';
import { parseVideoSource } from '../../utils/videoUrl.js';
import GalleryManager from './GalleryManager.jsx';

export default function AdminDashboard({ onOpenSetup }) {
  const { t, translateIsland } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [provinces, setProvinces] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [selectedId, setSelectedId] = useState(() => searchParams.get('province') || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [islandFilter, setIslandFilter] = useState('');
  const [activeTab, setActiveTab] = useState('details');

  const [formState, setFormState] = useState(null);
  const [savingProvince, setSavingProvince] = useState(false);
  const [testingTtsLang, setTestingTtsLang] = useState(null);

  const [photos, setPhotos] = useState([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);

  const [toast, setToast] = useState(null);

  const notify = useCallback((type, message) => {
    setToast({ type, message, id: Date.now() });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  const loadProvinces = useCallback(async () => {
    setLoadingList(true);
    try {
      const list = await listAdminProvinces();
      setProvinces(list);
      setSelectedId((prev) => {
        const paramId = searchParams.get('province');
        if (paramId && list.some((p) => p.id === paramId)) return paramId;
        if (prev && list.some((p) => p.id === prev)) return prev;
        return list[0]?.id || '';
      });
    } catch (err) {
      notify('error', err.message || 'Failed to load provinces.');
    } finally {
      setLoadingList(false);
    }
  }, [notify, searchParams]);

  useEffect(() => {
    loadProvinces();
  }, [loadProvinces]);

  const selectedProvince = useMemo(
    () => provinces.find((p) => p.id === selectedId) || null,
    [provinces, selectedId]
  );

  useEffect(() => {
    if (!selectedProvince) {
      setFormState(null);
      setPhotos([]);
      return;
    }
    setFormState({
      name: selectedProvince.name || '',
      capital: selectedProvince.capital || '',
      island: selectedProvince.island || ISLAND_LIST[0],
      population: String(selectedProvince.population ?? 0),
      area_km2: String(selectedProvince.area_km2 ?? 0),
      lat: String(selectedProvince.lat ?? 0),
      lng: String(selectedProvince.lng ?? 0),
      audio_url: selectedProvince.audio_url || '',
      video_url: selectedProvince.video_url || '',
      description: selectedProvince.description || '',
      description_id: selectedProvince.description_id || '',
    });

    let cancelled = false;
    setLoadingPhotos(true);
    listProvincePhotos(selectedProvince.id)
      .then((items) => {
        if (!cancelled) setPhotos(Array.isArray(items) ? items : []);
      })
      .catch((err) => {
        if (!cancelled) {
          setPhotos([]);
          notify('error', err.message || 'Failed to load province gallery.');
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingPhotos(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedProvince?.id, notify]);

  const handleSelectProvince = (id) => {
    setSelectedId(id);
    setSearchParams(id ? { province: id } : {});
  };

  const handlePhotosChanged = (nextPhotos) => {
    setPhotos(nextPhotos);
    if (!selectedProvince) return;
    setProvinces((prev) =>
      prev.map((p) =>
        p.id === selectedProvince.id ? { ...p, photo_count: nextPhotos.length } : p
      )
    );
  };

  const handleSaveProvince = async (e) => {
    e.preventDefault();
    if (!selectedProvince || !formState) return;
    setSavingProvince(true);
    try {
      const updated = await updateProvince(selectedProvince.id, {
        name: formState.name,
        capital: formState.capital,
        island: formState.island,
        population: Number(formState.population),
        area_km2: Number(formState.area_km2),
        lat: Number(formState.lat),
        lng: Number(formState.lng),
        audio_url: formState.audio_url,
        video_url: formState.video_url,
        description: formState.description,
        description_id: formState.description_id,
      });
      setProvinces((prev) =>
        prev
          .map((p) =>
            p.id === selectedProvince.id ? { ...updated, photo_count: photos.length } : p
          )
          .sort((a, b) => a.name.localeCompare(b.name))
      );
      notify('success', t('admin.savedToast', { name: updated.name }));
    } catch (err) {
      notify('error', err.message || 'Failed to save province.');
    } finally {
      setSavingProvince(false);
    }
  };

  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  const handleTestTts = (targetLang = 'en') => {
    if (!isTtsSupported()) {
      notify('error', t('admin.ttsUnavailable'));
      return;
    }
    if (testingTtsLang === targetLang) {
      stopSpeech();
      setTestingTtsLang(null);
      return;
    }
    const text =
      targetLang === 'id'
        ? formState?.description_id?.trim() || buildDefaultDescription(selectedProvince, 'id')
        : formState?.description?.trim() || buildDefaultDescription(selectedProvince, 'en');
    setTestingTtsLang(targetLang);
    speakTextHd(text, {
      lang: targetLang,
      onStart: () => setTestingTtsLang(targetLang),
      onEnd: () => setTestingTtsLang(null),
      onError: () => setTestingTtsLang(null),
    });
  };

  const handleResetDemo = () => {
    resetDemoData();
    notify('info', t('admin.resetDemoToast'));
    loadProvinces();
  };

  const filteredProvinces = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return provinces.filter((p) => {
      if (islandFilter && p.island !== islandFilter) return false;
      if (q) {
        return (
          p.name.toLowerCase().includes(q) ||
          p.capital.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [provinces, searchQuery, islandFilter]);

  const kpis = useMemo(() => {
    const totalProvinces = provinces.length;
    const withPhotos = provinces.filter((p) => (p.photo_count || 0) > 0).length;
    const totalPhotos = provinces.reduce((sum, p) => sum + (p.photo_count || 0), 0);
    const islandGroups = new Set(provinces.map((p) => p.island)).size;
    const coveragePct = totalProvinces > 0 ? Math.round((withPhotos / totalProvinces) * 100) : 0;
    const avgPhotos = totalProvinces > 0 ? (totalPhotos / totalProvinces).toFixed(1) : '0.0';
    return { totalProvinces, withPhotos, totalPhotos, islandGroups, coveragePct, avgPhotos };
  }, [provinces]);

  return (
    <div className="admin-dashboard">
      {!isSupabaseConfigured && (
        <div className="admin-demo-banner">
          <div>
            <strong>{t('admin.demoTitle')}</strong> — {t('admin.demoDescPre')}{' '}
            <code>localStorage</code> {t('admin.demoDescMid')} <code>frontend/.env</code>{' '}
            {t('admin.demoDescPost')}
          </div>
          <div className="admin-demo-actions">
            <button type="button" className="admin-btn admin-btn-secondary admin-btn-sm" onClick={onOpenSetup}>
              {t('admin.setupGuideBtn')}
            </button>
            <button type="button" className="admin-btn admin-btn-ghost admin-btn-sm" onClick={handleResetDemo}>
              {t('admin.resetDemoBtn')}
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div className={`admin-toast admin-toast-${toast.type}`} role="status">
          <span>{toast.message}</span>
          <button type="button" onClick={() => setToast(null)} aria-label="Dismiss notification">
            ×
          </button>
        </div>
      )}

      <section className="admin-kpi-grid" aria-label="Database summary">
        <div className="admin-kpi-card admin-kpi-card--coral">
          <div className="admin-kpi-head">
            <span className="admin-kpi-label">{t('admin.kpiTotalProvinces')}</span>
            <span className="admin-kpi-icon" aria-hidden="true">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
          </div>
          <div className="admin-kpi-value">{kpis.totalProvinces}</div>
          <div className="admin-kpi-meta">{t('admin.kpiArchipelago')}</div>
        </div>

        <div className="admin-kpi-card admin-kpi-card--emerald">
          <div className="admin-kpi-head">
            <span className="admin-kpi-label">{t('admin.kpiWithPhotos')}</span>
            <span className="admin-kpi-icon" aria-hidden="true">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </span>
          </div>
          <div className="admin-kpi-value">{kpis.withPhotos}</div>
          <div className="admin-kpi-meta">{t('admin.kpiCoverage', { pct: kpis.coveragePct })}</div>
          <div className="admin-kpi-bar" aria-hidden="true">
            <span style={{ width: `${kpis.coveragePct}%` }} />
          </div>
        </div>

        <div className="admin-kpi-card admin-kpi-card--sky">
          <div className="admin-kpi-head">
            <span className="admin-kpi-label">{t('admin.kpiTotalPhotos')}</span>
            <span className="admin-kpi-icon" aria-hidden="true">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            </span>
          </div>
          <div className="admin-kpi-value">{kpis.totalPhotos}</div>
          <div className="admin-kpi-meta">{t('admin.kpiAvgPhotos', { avg: kpis.avgPhotos })}</div>
        </div>

        <div className="admin-kpi-card admin-kpi-card--violet">
          <div className="admin-kpi-head">
            <span className="admin-kpi-label">{t('admin.kpiIslandGroups')}</span>
            <span className="admin-kpi-icon" aria-hidden="true">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </span>
          </div>
          <div className="admin-kpi-value">{kpis.islandGroups}</div>
          <div className="admin-kpi-meta">{t('admin.kpiMajorRegions')}</div>
        </div>
      </section>

      <div className="admin-workspace">
        <aside className="admin-list-panel">
          <div className="admin-list-controls">
            <div className="admin-list-top">
              <h2>{t('admin.provincesHeading')}</h2>
            </div>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('admin.filterPlaceholder')}
              aria-label={t('admin.filterAria')}
            />
            <select
              value={islandFilter}
              onChange={(e) => setIslandFilter(e.target.value)}
              aria-label={t('admin.filterIslandAria')}
            >
              <option value="">{t('admin.allIslandsOption')}</option>
              {ISLAND_LIST.map((isl) => (
                <option key={isl} value={isl}>
                  {translateIsland(isl)}
                </option>
              ))}
            </select>
          </div>

          <ul className="admin-province-list">
            {loadingList ? (
              <li className="admin-list-empty">{t('admin.loadingProvinces')}</li>
            ) : filteredProvinces.length === 0 ? (
              <li className="admin-list-empty">{t('admin.noMatchingProvinces')}</li>
            ) : (
              filteredProvinces.map((prov) => {
                const active = prov.id === selectedId;
                const dotColor = ISLAND_COLORS[prov.island] || '#E56A4A';
                return (
                  <li key={prov.id}>
                    <button
                      type="button"
                      className={`admin-province-row ${active ? 'active' : ''}`}
                      onClick={() => handleSelectProvince(prov.id)}
                    >
                      <span className="province-dot" style={{ backgroundColor: dotColor }} />
                      <div className="admin-row-text">
                        <div className="admin-row-name">{prov.name}</div>
                        <div className="admin-row-meta">{prov.capital}</div>
                      </div>
                      <span className="admin-row-badge" title="Stored gallery photos">
                        {prov.photo_count || 0} 📷
                      </span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </aside>

        <section className="admin-editor-panel">
          {!selectedProvince || !formState ? (
            <div className="admin-empty-box">{t('admin.selectPrompt')}</div>
          ) : (
            <>
              <header className="admin-editor-header">
                <div>
                  <span
                    className="detail-island-tag"
                    style={{ backgroundColor: ISLAND_COLORS[selectedProvince.island] || '#E56A4A' }}
                  >
                    {translateIsland(selectedProvince.island)}
                  </span>
                  <h2>{selectedProvince.name}</h2>
                  <p className="admin-muted">
                    {t('admin.slugId')} <code>{selectedProvince.id}</code>
                  </p>
                </div>
              </header>

              <div className="admin-tabs" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'details'}
                  className={`admin-tab ${activeTab === 'details' ? 'active' : ''}`}
                  onClick={() => setActiveTab('details')}
                >
                  {t('admin.tabDetails')}
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'gallery'}
                  className={`admin-tab ${activeTab === 'gallery' ? 'active' : ''}`}
                  onClick={() => setActiveTab('gallery')}
                >
                  {t('admin.tabGallery', { count: photos.length })}
                </button>
              </div>

              {activeTab === 'details' ? (
                <form onSubmit={handleSaveProvince} className="admin-details-form">
                  <div className="admin-form-grid">
                    <label className="admin-field">
                      <span>{t('admin.fieldName')}</span>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) =>
                          setFormState((s) => ({ ...s, name: e.target.value }))
                        }
                      />
                    </label>
                    <label className="admin-field">
                      <span>{t('admin.fieldCapital')}</span>
                      <input
                        type="text"
                        required
                        value={formState.capital}
                        onChange={(e) =>
                          setFormState((s) => ({ ...s, capital: e.target.value }))
                        }
                      />
                    </label>
                    <label className="admin-field">
                      <span>{t('admin.fieldIsland')}</span>
                      <select
                        value={formState.island}
                        onChange={(e) =>
                          setFormState((s) => ({ ...s, island: e.target.value }))
                        }
                      >
                        {ISLAND_LIST.map((isl) => (
                          <option key={isl} value={isl}>
                            {translateIsland(isl)}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="admin-field">
                      <span>{t('admin.fieldPopulation')}</span>
                      <input
                        type="number"
                        min="0"
                        required
                        value={formState.population}
                        onChange={(e) =>
                          setFormState((s) => ({ ...s, population: e.target.value }))
                        }
                      />
                    </label>
                    <label className="admin-field">
                      <span>{t('admin.fieldArea')}</span>
                      <input
                        type="number"
                        min="0"
                        required
                        value={formState.area_km2}
                        onChange={(e) =>
                          setFormState((s) => ({ ...s, area_km2: e.target.value }))
                        }
                      />
                    </label>
                    <label className="admin-field">
                      <span>{t('admin.fieldAudioUrl')}</span>
                      <input
                        type="url"
                        value={formState.audio_url}
                        onChange={(e) =>
                          setFormState((s) => ({ ...s, audio_url: e.target.value }))
                        }
                        placeholder={t('admin.fieldAudioPlaceholder')}
                      />
                    </label>
                    <label className="admin-field">
                      <span>{t('admin.fieldLat')}</span>
                      <input
                        type="number"
                        step="any"
                        required
                        value={formState.lat}
                        onChange={(e) =>
                          setFormState((s) => ({ ...s, lat: e.target.value }))
                        }
                      />
                    </label>
                    <label className="admin-field">
                      <span>{t('admin.fieldLng')}</span>
                      <input
                        type="number"
                        step="any"
                        required
                        value={formState.lng}
                        onChange={(e) =>
                          setFormState((s) => ({ ...s, lng: e.target.value }))
                        }
                      />
                    </label>
                    <div className="admin-field admin-field-full">
                      <div className="admin-field-header">
                        <span>{t('admin.fieldVideoUrl')}</span>
                        {formState.video_url && (
                          <button
                            type="button"
                            className="admin-link-btn"
                            onClick={() =>
                              setFormState((s) => ({ ...s, video_url: '' }))
                            }
                          >
                            {t('admin.clearBtn')}
                          </button>
                        )}
                      </div>
                      <input
                        type="url"
                        value={formState.video_url}
                        onChange={(e) =>
                          setFormState((s) => ({ ...s, video_url: e.target.value }))
                        }
                        placeholder="https://www.youtube.com/watch?v=... or https://.../video.mp4"
                        aria-label={t('admin.fieldVideoUrl')}
                      />
                      {(() => {
                        const preview = parseVideoSource(formState.video_url);
                        if (preview.kind === 'empty') {
                          return (
                            <div className="admin-video-hint">
                              <span>{t('admin.videoHintDefault')}</span>
                            </div>
                          );
                        }
                        if (preview.kind === 'invalid') {
                          return (
                            <div className="admin-video-hint admin-video-hint-error">
                              <span>{t('admin.videoHintInvalid')}</span>
                            </div>
                          );
                        }
                        return (
                          <div className="admin-video-hint">
                            <span>
                              {t('admin.videoHintDetected', { provider: preview.provider })}
                            </span>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  <div className="admin-field">
                    <div className="admin-field-header">
                      <span>
                        {t('admin.descEnLabel', { count: formState.description.length })}
                      </span>
                      <div className="admin-field-tools">
                        <button
                          type="button"
                          className="admin-link-btn"
                          onClick={() =>
                            setFormState((s) => ({
                              ...s,
                              description: buildDefaultDescription(
                                {
                                  name: s.name,
                                  capital: s.capital,
                                  island: s.island,
                                  area_km2: Number(s.area_km2),
                                  population: Number(s.population),
                                },
                                'en'
                              ),
                            }))
                          }
                        >
                          {t('admin.generateDefault')}
                        </button>
                        <button
                          type="button"
                          className="admin-link-btn"
                          onClick={() => handleTestTts('en')}
                        >
                          {testingTtsLang === 'en' ? t('admin.stopTts') : t('admin.testTtsEn')}
                        </button>
                      </div>
                    </div>
                    <textarea
                      rows={5}
                      value={formState.description}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, description: e.target.value }))
                      }
                      placeholder={t('admin.descPlaceholder')}
                    />
                  </div>

                  <div className="admin-field">
                    <div className="admin-field-header">
                      <span>
                        {t('admin.descIdLabel', { count: formState.description_id.length })}
                      </span>
                      <div className="admin-field-tools">
                        <button
                          type="button"
                          className="admin-link-btn"
                          onClick={() =>
                            setFormState((s) => ({
                              ...s,
                              description_id: buildDefaultDescription(
                                {
                                  name: s.name,
                                  capital: s.capital,
                                  island: s.island,
                                  area_km2: Number(s.area_km2),
                                  population: Number(s.population),
                                },
                                'id'
                              ),
                            }))
                          }
                        >
                          {t('admin.generateDefault')}
                        </button>
                        <button
                          type="button"
                          className="admin-link-btn"
                          onClick={() => handleTestTts('id')}
                        >
                          {testingTtsLang === 'id' ? t('admin.stopTts') : t('admin.testTtsId')}
                        </button>
                      </div>
                    </div>
                    <textarea
                      rows={5}
                      value={formState.description_id}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, description_id: e.target.value }))
                      }
                      placeholder={t('admin.descIdPlaceholder')}
                    />
                  </div>

                  <div className="admin-form-footer">
                    <button
                      type="submit"
                      className="admin-btn admin-btn-primary"
                      disabled={savingProvince}
                    >
                      {savingProvince ? t('admin.saving') : t('admin.saveBtn')}
                    </button>
                  </div>
                </form>
              ) : (
                <GalleryManager
                  province={selectedProvince}
                  photos={photos}
                  loading={loadingPhotos}
                  onPhotosChanged={handlePhotosChanged}
                  notify={notify}
                />
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
