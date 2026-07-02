import type { MouseEvent as ReactMouseEvent } from 'react';

/**
 * Spawns a short-lived ripple element at the click position inside
 * `event.currentTarget`. The target must have `position: relative` (or
 * similar) and `overflow: hidden` — both are provided by `.glass-panel`.
 *
 * Implemented with direct DOM manipulation (not React state) so a click
 * never triggers a re-render just for a decorative effect.
 */
export function spawnRipple(event: ReactMouseEvent<HTMLElement>): void {
  const target = event.currentTarget;
  const rect = target.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 1.6;

  const span = document.createElement('span');
  span.className = 'ripple';
  span.style.width = `${size}px`;
  span.style.height = `${size}px`;
  span.style.left = `${event.clientX - rect.left - size / 2}px`;
  span.style.top = `${event.clientY - rect.top - size / 2}px`;

  target.appendChild(span);

  span.addEventListener(
    'animationend',
    () => {
      span.remove();
    },
    { once: true },
  );
}