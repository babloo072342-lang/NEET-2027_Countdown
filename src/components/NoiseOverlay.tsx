import { memo } from 'react';

// Inline SVG fractal-noise filter encoded as a data URI. Generated once at
// module scope (not per render) since it's a constant string.
const NOISE_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

/**
 * Subtle full-viewport film-grain overlay. Purely decorative, static, and
 * memoized so it never re-renders.
 */
function NoiseOverlayBase() {
  return (
    <div
      className="noise-overlay"
      aria-hidden="true"
      style={{ backgroundImage: `url("${NOISE_SVG}")` }}
    />
  );
}

export const NoiseOverlay = memo(NoiseOverlayBase);