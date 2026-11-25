import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../lib/i18n.js';
import { isSupabaseConfigured, useAdminEdgeFunction } from '../lib/supabase.js';
import { getAdminSession, signOutAdmin } from '../services/adminService.js';
import SupabaseSetupModal from '../components/SupabaseSetupModal.jsx';
import AdminDashboard from '../components/admin/AdminDashboard.jsx';
import AdminLogin from '../components/admin/AdminLogin.jsx';

export default function AdminPage({ theme, onToggleTheme }) {
  const { lang, setLang, t } = useLanguage();
  const [sessionState, setSessionState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [setupOpen, setSetupOpen] = useState(false);

  const checkSession = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const state = await getAdminSession();
      setSessionState(state);
    } catch (err) {
      setError(err.message || 'Failed to check admin session');
      setSessionState({ mode: 'supabase', user: null, role: null, isAdmin: false });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const handleSignOut = async () => {
    try {
      await signOutAdmin();
      await checkSession();
    } catch (err) {
      setError(err.message || 'Sign out failed');
    }
  };

  const modeBadgeLabel = !isSupabaseConfigured
    ? t('admin.badgeDemo')
    : useAdminEdgeFunction
      ? t('admin.badgeEdge')
      : t('admin.badgeLive');

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <div className="admin-topbar-left">
          <div className="admin-brand-group">
            <Link to="/" className="admin-brand">
              Indonesia<span className="text-brand-gradient">Ku</span>
            </Link>
            <span className="admin-brand-tag">{t('map.admin')}</span>
          </div>
          <span
            className={`status-badge ${isSupabaseConfigured ? 'status-online' : 'status-demo'}`}
          >
            <span className="status-dot" />
            {modeBadgeLabel}
          </span>
        </div>

        <div className="admin-topbar-right">
          {!isSupabaseConfigured && (
            <button
              type="button"
              className="admin-btn admin-btn-secondary admin-btn-sm"
              onClick={() => setSetupOpen(true)}
            >
              {t('admin.setupBtn')}
            </button>
          )}
          <div className="lang-toggle lang-toggle-sm" role="group" aria-label={t('lang.label')}>
            <button
              type="button"
              className={`lang-toggle-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
              title={t('lang.switchToEn')}
            >
              EN
            </button>
            <button
              type="button"
              className={`lang-toggle-btn ${lang === 'id' ? 'active' : ''}`}
              onClick={() => setLang('id')}
              aria-pressed={lang === 'id'}
              title={t('lang.switchToId')}
            >
              ID
            </button>
          </div>
          <Link to="/" className="admin-btn admin-btn-secondary admin-btn-sm">
            {t('admin.viewMap')}
          </Link>
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={t('admin.cycleTheme')}
            title={t('admin.themeTitle', { theme })}
          >
            {theme === 'cartoon' ? '🎨' : theme === 'dark' ? '🌙' : '☀️'}
          </button>
          {isSupabaseConfigured && sessionState?.user && (
            <button
              type="button"
              className="admin-btn admin-btn-ghost admin-btn-sm"
              onClick={handleSignOut}
            >
              {t('admin.signOut')}
            </button>
          )}
        </div>
      </header>

      <main className="admin-main">
        {error && (
          <div className="admin-alert admin-alert-error" role="alert">
            {error}
          </div>
        )}

        {loading ? (
          <div className="admin-loading-state" role="status" aria-live="polite">
            <div className="map-move-loader-badge">
              <div className="map-spinner map-spinner-sm" aria-hidden="true" />
            </div>
            <p className="map-loading-text">{t('admin.checkingSession')}</p>
          </div>
        ) : sessionState?.isAdmin ? (
          <AdminDashboard onOpenSetup={() => setSetupOpen(true)} />
        ) : (
          <AdminLogin
            sessionState={sessionState}
            onLoginSuccess={(next) => setSessionState(next)}
            onRecheck={checkSession}
            onSignOut={handleSignOut}
            onOpenSetup={() => setSetupOpen(true)}
          />
        )}
      </main>

      <SupabaseSetupModal open={setupOpen} onClose={() => setSetupOpen(false)} />
    </div>
  );
}
