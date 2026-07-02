import { useEffect, useRef } from 'react';

type PointerHandler = (normalizedX: number, normalizedY: number, clientX: number, clientY: number) => void;

/**
 * Tracks pointer position and invokes `onMove` at most once per animation
 * frame. Coordinates are normalized to -0.5..0.5 relative to the viewport
 * center, alongside raw client coordinates.
 *
 * No React state is used here on purpose: consumers mutate refs/DOM
 * directly (e.g. via style.setProperty) for a jitter-free 60fps experience
 * without triggering component re-renders on every mouse move.
 *
 * Automatically disabled on touch/coarse-pointer devices.
 */
export function usePointerPosition(onMove: PointerHandler, enabled = true): void {
  const frameRef = useRef<number | null>(null);
  const latestRef = useRef({ x: 0, y: 0, clientX: 0, clientY: 0 });
  const onMoveRef = useRef(onMove);
  onMoveRef.current = onMove;

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === 'undefined') return;

    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handleMove = (event: PointerEvent) => {
      latestRef.current = {
        x: event.clientX / window.innerWidth - 0.5,
        y: event.clientY / window.innerHeight - 0.5,
        clientX: event.clientX,
        clientY: event.clientY,
      };

      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(() => {
          const { x, y, clientX, clientY } = latestRef.current;
          onMoveRef.current(x, y, clientX, clientY);
          frameRef.current = null;
        });
      }
    };

    window.addEventListener('pointermove', handleMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handleMove);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [enabled]);
}