import { memo, useEffect, useRef } from 'react';
import { usePointerPosition } from '../hooks/usePointerPosition';

/**
 * A soft glow that trails the cursor with gentle easing (lerp), giving a
 * premium "spotlight" feel. Position updates are written directly to the
 * element's `transform` inside a `requestAnimationFrame` loop — no React
 * state — so this never causes a re-render and stays smooth at 60fps.
 *
 * Automatically inert on touch devices (via `usePointerPosition`'s
 * fine-pointer check) and respects `prefers-reduced-motion` by skipping
 * the animation loop entirely.
 */
function CursorGlowBase() {
  const glowRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const hasPositioned = useRef(false);

  usePointerPosition((_normX, _normY, clientX, clientY) => {
    target.current.x = clientX;
    target.current.y = clientY;
    if (!hasPositioned.current) {
      current.current.x = clientX;
      current.current.y = clientY;
      hasPositioned.current = true;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (prefersReducedMotion || !isFinePointer) return;

    let frame: number;

    const loop = () => {
      current.current.x += (target.current.x - current.current.x) * 0.15;
      current.current.y += (target.current.y - current.current.y) * 0.15;

      const el = glowRef.current;
      if (el) {
        el.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      }

      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />;
}

export const CursorGlow = memo(CursorGlowBase);