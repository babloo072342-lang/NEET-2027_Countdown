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
      <GlassPanel className="countdown-expired" tilt={false}>
        <p className="countdown-expired__title">The exam day has arrived.</p>
        <p className="countdown-expired__subtitle">Everything you prepared for starts now.</p>
      </GlassPanel>
    );
  }

  return (
    <div className="countdown-grid" role="group" aria-label="Countdown to NEET 2027 exam">
      {UNITS.map(({ key, label, icon: Icon }, index) => (
        <GlassPanel
          key={key}
          className="countdown-unit"
          style={{ animationDelay: `${index * 90}ms` }}
        >
          <Icon className="countdown-unit__icon" strokeWidth={1.5} aria-hidden="true" />
          <div className="countdown-unit__value">
            <AnimatedNumber value={timeLeft[key]} />
          </div>
          <span className="countdown-unit__label">{label}</span>
          <span className="sr-only">
            {timeLeft[key]} {label}
          </span>
        </GlassPanel>
      ))}
    </div>
  );
}

export const Countdown = memo(CountdownBase);
