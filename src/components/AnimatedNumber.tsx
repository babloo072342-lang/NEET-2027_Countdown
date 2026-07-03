import { AnimatePresence, motion } from 'framer-motion';

interface AnimatedNumberProps {
  value: number;
  digits?: number;
}

/**
 * Renders a number as individually animated digit "slots" that slide/flip
 * when their value changes (odometer-style), instead of the whole number
 * snapping to a new value. Each slot owns its own `AnimatePresence`, so
 * only the digit(s) that actually changed animate.
 *
 * The visual digits are `aria-hidden`; a screen-reader-only sibling should
 * be rendered by the parent with the full readable value.
 */
export function AnimatedNumber({ value, digits = 2 }: AnimatedNumberProps) {
  const clamped = Math.max(0, value);
  const str = String(clamped).padStart(digits, '0');

  return (
    <span className="animated-number" aria-hidden="true">
      {str.split('').map((char, slotIndex) => (
        <span className="animated-number__slot" key={slotIndex}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={char}
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="animated-number__digit"
            >
              {char}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
}
