import { memo, useMemo, useRef } from 'react';
import { usePointerPosition } from '../hooks/usePointerPosition';

interface Star {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
}

/**
 * Renders the twinkling starfield. Star positions are generated once via
 * `useMemo` (and the component itself is memoized with no changing props),
 * so — unlike the original implementation, which recomputed
 * `Math.random()` on every render triggered by the countdown's 1-second
 * tick — stars never jump around after mount.
 */
function StarfieldBase() {
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: 60 }, (_, id) => ({
        id,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 1.6 + 0.6,
        delay: Math.random() * 4,
        duration: 2.5 + Math.random() * 3,
      })),
    [],
  );

  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((star) => (
        <span
          key={star.id}
          className="star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

const Starfield = memo(StarfieldBase);

/**
 * Full-viewport animated aurora backdrop: three blurred, color-shifting
 * blobs that drift on their own CSS keyframe animations and additionally
 * respond to pointer movement (subtle parallax), plus a vignette to keep
 * foreground content readable and a starfield for depth.
 *
 * Memoized with no props, so it renders once and is never touched again by
 * re-renders elsewhere in the tree (e.g. the countdown ticking every
 * second).
 */
function AuroraBackgroundBase() {
  const layerRef = useRef<HTMLDivElement>(null);

  usePointerPosition((x, y) => {
    const el = layerRef.current;
    if (!el) return;
    el.style.setProperty('--px', x.toFixed(4));
    el.style.setProperty('--py', y.toFixed(4));
  });

  return (
    <div className="aurora-root" aria-hidden="true">
      <div ref={layerRef} className="aurora-parallax">
        <span className="aurora-blob aurora-blob--indigo" />
        <span className="aurora-blob aurora-blob--teal" />
        <span className="aurora-blob aurora-blob--gold" />
      </div>
      <Starfield />
      <div className="aurora-vignette" />
    </div>
  );
}

export const AuroraBackground = memo(AuroraBackgroundBase);