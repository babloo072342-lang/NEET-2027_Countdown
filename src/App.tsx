import { Star, Rocket, Calendar, Target, Zap, Flame } from 'lucide-react';
import { GlassPanel } from './components/GlassPanel';
import { AuroraBackground } from './components/AuroraBackground';
import { CursorGlow } from './components/CursorGlow';
import { NoiseOverlay } from './components/NoiseOverlay';
import { Countdown } from './components/Countdown';

function App() {
  return (
    <div className="min-h-screen relative">
      <AuroraBackground />
      <CursorGlow />
      <NoiseOverlay />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <header className="text-center mb-16 reveal-item" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-6xl md:text-8xl font-extrabold mb-4 tracking-tight" style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}>
            <span className="bg-gradient-to-r from-[#7c8aff] via-[#4fd1c5] to-[#f0c674] bg-clip-text text-transparent">
              DareDevil
            </span>
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-[var(--c-text)] mb-3">
            NEET 2027 Countdown
          </p>
          <div className="flex items-center justify-center gap-2 text-[var(--c-text-dim)]">
            <Calendar className="w-5 h-5" />
            <span>May 2, 2027 - 2:00 PM IST</span>
          </div>
        </header>

        <Countdown />

        <GlassPanel className="p-8 md:p-12 max-w-3xl w-full reveal-item mt-16" style={{ animationDelay: '0.6s' }}>
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Rocket className="w-14 h-14 text-[var(--c-indigo)]" />
                <Flame className="w-6 h-6 text-[var(--c-gold)] absolute -bottom-2 left-1/2 -translate-x-1/2 animate-pulse" />
              </div>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-[var(--c-text)] mb-4">
              Your Journey to Success Starts Now
            </h2>
            <p className="text-base md:text-lg text-[var(--c-text-dim)] mb-8 leading-relaxed">
              Every second counts in your preparation. Stay focused, stay determined, and let your dreams guide you to victory.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-[rgba(124,138,255,0.15)] border-2 border-[var(--c-indigo)] group-hover:scale-110 transition-transform">
                  <Star className="w-8 h-8 text-[var(--c-indigo)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--c-text)] mb-1">Preparation</h3>
                <p className="text-sm text-[var(--c-text-dim)]">Build strong foundations</p>
              </div>

              <div className="group">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-[rgba(79,209,197,0.15)] border-2 border-[var(--c-teal)] group-hover:scale-110 transition-transform">
                  <Target className="w-8 h-8 text-[var(--c-teal)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--c-text)] mb-1">Focus</h3>
                <p className="text-sm text-[var(--c-text-dim)]">Stay on target</p>
              </div>

              <div className="group">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-[rgba(240,198,116,0.15)] border-2 border-[var(--c-gold)] group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-[var(--c-gold)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--c-text)] mb-1">Excellence</h3>
                <p className="text-sm text-[var(--c-text-dim)]">Achieve your dreams</p>
              </div>
            </div>
          </div>
        </GlassPanel>

        <footer className="mt-16 text-center reveal-item" style={{ animationDelay: '0.8s' }}>
          <blockquote className="text-[var(--c-text-dim)] italic text-sm md:text-base max-w-md">
            "Success is not final, failure is not fatal: it is the courage to continue that counts."
          </blockquote>
          <p className="text-[var(--c-text-dim)] text-xs mt-4">- Winston Churchill</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
