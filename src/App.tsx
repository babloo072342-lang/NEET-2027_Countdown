import { Calendar } from 'lucide-react';
import { AuroraBackground } from './components/AuroraBackground';
import { NoiseOverlay } from './components/NoiseOverlay';
import { CursorGlow } from './components/CursorGlow';
import { Countdown } from './components/Countdown';
import { Pillars } from './components/Pillars';

/**
 * Root composition. Deliberately holds no state of its own: the countdown
 * clock lives inside <Countdown />, and the aurora/cursor-glow effects
 * track the pointer via refs — so this component renders exactly once and
 * everything below animates independently without cascading re-renders.
 */
function App() {
  return (
    <div className="page">
      <AuroraBackground />
      <NoiseOverlay />
      <CursorGlow />

      <main className="page__content">
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

export default App;
