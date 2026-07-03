import { memo } from 'react';
import { Calendar, Clock3, Hourglass, Sparkles, Target } from 'lucide-react';
import { useCountdown } from '../hooks/useCountdown';
import { AnimatedNumber } from './AnimatedNumber';
import { GlassPanel } from './GlassPanel';

const EXAM_DATE_ISO = '2027-05-02T14:00:00+05:30';

const UNITS = [
  { key: 'months', label: 'Months', icon: Calendar },
  { key: 'days', label: 'Days', icon: Hourglass },
  { key: 'hours', label: 'Hours', icon: Clock3 },
  { key: 'minutes', label: 'Minutes', icon: Target },
  { key: 'seconds', label: 'Seconds', icon: Sparkles },
] as const;

/**
 * The countdown grid. `useCountdown` lives here (not in App), so the
 * once-per-second tick only re-renders this subtree — the aurora
 * background, cursor glow, and pillars section never re-render because of
 * the clock.
 */
function CountdownBase() {
  const timeLeft = useCountdown(EXAM_DATE_ISO);

  if (timeLeft.expired) {
    return (
      <GlassPanel className="countdown-expired p-12 text-center" tilt={false}>
        <p className="text-4xl font-bold text-[var(--c-text)] mb-4">The exam day has arrived.</p>
        <p className="text-xl text-[var(--c-text-dim)]">Everything you prepared for starts now.</p>
      </GlassPanel>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 w-full max-w-5xl" role="group" aria-label="Countdown to NEET 2027 exam">
      {UNITS.map(({ key, label, icon: Icon }, index) => (
        <GlassPanel
          key={key}
          className="p-6 md:p-8 text-center reveal-item"
          style={{ animationDelay: `${0.15 + index * 0.08}s` }}
        >
          <Icon className="w-7 h-7 text-[var(--c-teal)] mx-auto mb-4" strokeWidth={1.5} aria-hidden="true" />
          <div className="countdown-digit text-4xl md:text-6xl font-bold text-[var(--c-text)] mb-2">
            <AnimatedNumber value={timeLeft[key]} />
          </div>
          <span className="text-xs md:text-sm uppercase tracking-widest text-[var(--c-text-dim)]">{label}</span>
          <span className="sr-only">
            {timeLeft[key]} {label}
          </span>
        </GlassPanel>
      ))}
    </div>
  );
}

export const Countdown = memo(CountdownBase);
