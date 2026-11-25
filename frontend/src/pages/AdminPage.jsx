import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isSupabaseConfigured, useAdminEdgeFunction } from '../lib/supabase.js';
import { getAdminSession, signOutAdmin } from '../services/adminService.js';
import SupabaseSetupModal from '../components/SupabaseSetupModal.jsx';
import AdminDashboard from '../components/admin/AdminDashboard.jsx';
import AdminLogin from '../components/admin/AdminLogin.jsx';

export default function AdminPage({ theme, onToggleTheme }) {
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
    ? 'Demo Mode'
    : useAdminEdgeFunction
      ? 'Edge API Live'
      : 'Supabase Live';

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <div className="admin-topbar-left">
          <div className="admin-brand-group">
            <Link to="/" className="admin-brand">
              Indonesia<span className="text-brand-gradient">Ku</span>
            </Link>
            <span className="admin-brand-tag">Admin</span>
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
              Supabase Setup
            </button>
          )}
          <Link to="/" className="admin-btn admin-btn-secondary admin-btn-sm">
            View Map
          </Link>
          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label="Cycle theme"
            title={`Current theme: ${theme} (click to switch)`}
          >
            {theme === 'cartoon' ? '🎨' : theme === 'dark' ? '🌙' : '☀️'}
          </button>
          {isSupabaseConfigured && sessionState?.user && (
            <button
              type="button"
              className="admin-btn admin-btn-ghost admin-btn-sm"
              onClick={handleSignOut}
            >
              Sign Out
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
            <p className="map-loading-text">Checking admin session...</p>
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
