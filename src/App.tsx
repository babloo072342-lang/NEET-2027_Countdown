import { Calendar, Loader2 } from 'lucide-react';
import { AuroraBackground } from './components/AuroraBackground';
import { NoiseOverlay } from './components/NoiseOverlay';
import { CursorGlow } from './components/CursorGlow';
import { Countdown } from './components/Countdown';
import { Pillars } from './components/Pillars';
import { UserMenu } from './components/UserMenu';
import { LoginPage } from './components/LoginPage';
import { useAuth } from './hooks/useAuth';

function Dashboard() {
  return (
    <div className="page">
      <AuroraBackground />
      <NoiseOverlay />
      <CursorGlow />

      <main className="page__content">
        <div className="page__topbar">
          <UserMenu />
        </div>

        <section className="hero">
          <span className="eyebrow reveal-item" style={{ animationDelay: '0ms' }}>
            Mission NEET 2027
          </span>

          <h1 className="wordmark reveal-item" style={{ animationDelay: '90ms' }}>
            DareDevil
          </h1>

          <p className="tagline reveal-item" style={{ animationDelay: '180ms' }}>
            Every second brings you closer <span className="tagline__accent">to May 2, 2027.</span>
          </p>

          <div className="hero__date reveal-item" style={{ animationDelay: '270ms' }}>
            <Calendar className="hero__date-icon" strokeWidth={1.5} aria-hidden="true" />
            <span>NEET UG 2027 &middot; 2:00 PM IST</span>
          </div>

          <div className="reveal-item" style={{ animationDelay: '360ms' }}>
            <Countdown />
          </div>
        </section>

        <section className="pillars-section" aria-label="Preparation pillars">
          <span className="eyebrow">The Path</span>
          <h2 className="section-title">Three things that decide the outcome</h2>
          <Pillars />
        </section>

        <footer className="footer">
          <div className="footer__divider" aria-hidden="true" />
          <blockquote className="footer__quote">
            &ldquo;Success is not final, failure is not fatal: it is the courage to continue that
            counts.&rdquo;
          </blockquote>
        </footer>
      </main>
    </div>
  );
}

function App() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="auth-loading">
        <Loader2 className="auth-loading__spinner" strokeWidth={1.5} aria-hidden="true" />
        <span className="auth-loading__text">Loading…</span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="page">
        <AuroraBackground />
        <NoiseOverlay />
        <CursorGlow />
        <main className="page__content">
          <LoginPage />
        </main>
      </div>
    );
  }

  return <Dashboard />;
}

export default App;
