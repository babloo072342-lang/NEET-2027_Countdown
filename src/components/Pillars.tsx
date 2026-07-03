import { memo } from 'react';
import type { CSSProperties } from 'react';
import { BookOpenCheck, Crosshair, Flame } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { GlassPanel } from './GlassPanel';
import { useInView } from '../hooks/useInView';

interface Pillar {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
}

const PILLARS: Pillar[] = [
  {
    icon: BookOpenCheck,
    title: 'Preparation',
    description: 'Build strong foundations, one focused session at a time.',
    accent: 'var(--c-teal)',
  },
  {
    icon: Crosshair,
    title: 'Focus',
    description: 'Protect your attention. Let distractions wait.',
    accent: 'var(--c-indigo)',
  },
  {
    icon: Flame,
    title: 'Excellence',
    description: 'Consistency compounds. Small wins, every single day.',
    accent: 'var(--c-gold)',
  },
];

interface PillarCardProps extends Pillar {
  index: number;
}

function PillarCard({ icon: Icon, title, description, accent, index }: PillarCardProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${inView ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <GlassPanel className="pillar-card">
        <span className="pillar-card__icon-ring" style={{ borderColor: accent }}>
          <Icon className="pillar-card__icon" style={{ color: accent } as CSSProperties} strokeWidth={1.5} aria-hidden />
        </span>
        <h3 className="pillar-card__title">{title}</h3>
        <p className="pillar-card__description">{description}</p>
      </GlassPanel>
    </div>
  );
}

function PillarsBase() {
  return (
    <div className="pillars-grid">
      {PILLARS.map((pillar, index) => (
        <PillarCard key={pillar.title} {...pillar} index={index} />
      ))}
    </div>
  );
}

export const Pillars = memo(PillarsBase);