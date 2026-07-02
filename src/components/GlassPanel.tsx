import { forwardRef, useImperativeHandle, useRef } from 'react';
import type { CSSProperties, MouseEvent, ReactNode } from 'react';
import { spawnRipple } from '../utils/ripple';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Enables the cursor-reactive 3D tilt. Disable for static/expired states. */
  tilt?: boolean;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

/**
 * Reusable "liquid glass" surface: frosted backdrop blur, an animated
 * gradient border, a cursor-following sheen highlight, a subtle 3D tilt on
 * mouse move, and a ripple on click. All interaction state is written
 * directly to the DOM via CSS custom properties (no React state), so
 * hovering/tilting never causes a re-render.
 */
export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(function GlassPanel(
  { children, className = '', style, tilt = true, onClick },
  forwardedRef,
) {
  const localRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(forwardedRef, () => localRef.current as HTMLDivElement);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!tilt) return;
    const el = localRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;

    el.style.setProperty('--rx', (py * -6).toFixed(2));
    el.style.setProperty('--ry', (px * 6).toFixed(2));
    el.style.setProperty('--mx', `${(px + 0.5) * 100}%`);
    el.style.setProperty('--my', `${(py + 0.5) * 100}%`);
  };

  const handleMouseLeave = () => {
    const el = localRef.current;
    if (!el) return;
    el.style.setProperty('--rx', '0');
    el.style.setProperty('--ry', '0');
  };

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    spawnRipple(event);
    onClick?.(event);
  };

  return (
    <div
      ref={localRef}
      className={`glass-panel ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="glass-panel__sheen" aria-hidden="true" />
      {children}
    </div>
  );
});