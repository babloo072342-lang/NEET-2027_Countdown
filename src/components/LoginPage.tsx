import { AlertCircle, Loader2 } from 'lucide-react';
import { GlassPanel } from './GlassPanel';
import { GoogleSignIn } from './GoogleSignIn';
import { useAuth } from '../hooks/useAuth';

export function LoginPage() {
  const { loading, error, clearError } = useAuth();

  return (
    <div className="login-screen">
      <div className="login-screen__panel reveal-item">
        <GlassPanel tilt={false} className="login-card">
          <span className="eyebrow">Welcome</span>
          <h1 className="login-card__title">Sign in to DareDevil</h1>
          <p className="login-card__subtitle">
            Continue your NEET 2027 preparation journey.
          </p>

          {error && (
            <div className="login-card__error" role="alert">
              <AlertCircle className="login-card__error-icon" strokeWidth={1.5} aria-hidden="true" />
              <span>{error}</span>
              <button type="button" className="login-card__error-dismiss" onClick={clearError}>
                Dismiss
              </button>
            </div>
          )}

          <GoogleSignIn />

          {loading && (
            <div className="login-card__loading">
              <Loader2 className="login-card__spinner" strokeWidth={1.5} aria-hidden="true" />
              <span>Checking your session…</span>
            </div>
          )}

          <p className="login-card__footer">
            By continuing you agree to keep your preparation streak alive.
          </p>
        </GlassPanel>
      </div>
    </div>
  );
}
