import { useEffect, useMemo, useRef } from 'react';

interface AuroraProps {
  pointerX: number;
  pointerY: number;
}

function Star({ style }: { style: React.CSSProperties }) {
  return <div className="star" style={style} />;
}

export function Aurora({ pointerX, pointerY }: AuroraProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parallax = parallaxRef.current;
    const cursorGlow = cursorGlowRef.current;
    if (!parallax || !cursorGlow) return;

    parallax.style.setProperty('--px', pointerX.toFixed(3));
    parallax.style.setProperty('--py', pointerY.toFixed(3));

    const x = (pointerX + 0.5) * window.innerWidth;
    const y = (pointerY + 0.5) * window.innerHeight;
    cursorGlow.style.transform = `translate(${x - 210}px, ${y - 210}px)`;
  }, [pointerX, pointerY]);

  const stars = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${1 + Math.random() * 2}px`,
        height: `${1 + Math.random() * 2}px`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${2 + Math.random() * 2}s`,
      },
    }));
  }, []);

  return (
    <div className="aurora-root">
      <div className="noise-overlay" aria-hidden="true" />
      <div className="aurora-parallax" ref={parallaxRef}>
        <div className="aurora-blob aurora-blob--indigo" />
        <div className="aurora-blob aurora-blob--teal" />
        <div className="aurora-blob aurora-blob--gold" />
      </div>
      <div className="starfield">
        {stars.map((star) => (
          <Star key={star.id} style={star.style} />
        ))}
      </div>
      <div className="aurora-vignette" />
      <div className="cursor-glow" ref={cursorGlowRef} />
    </div>
  );
}
