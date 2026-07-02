import { useEffect, useRef, useState } from 'react';

export interface TimeLeft {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

const MS_PER_DAY = 86_400_000;
const MS_PER_HOUR = 3_600_000;
const MS_PER_MINUTE = 60_000;

/**
 * Calendar-accurate difference between `target` and `now`.
 *
 * The original implementation divided the millisecond delta by an average
 * month length (30.44 days), which drifts by up to ~1 day depending on
 * which real calendar months fall inside the range. This version walks
 * calendar months explicitly, so "months" always matches what a human
 * would count on a calendar, and the remaining days/hours/minutes/seconds
 * are exact.
 */
function diff(target: Date, now: Date): TimeLeft {
  if (now.getTime() >= target.getTime()) {
    return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  let months = (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth());
  let cursor = new Date(now);
  cursor.setMonth(cursor.getMonth() + months);

  if (cursor.getTime() > target.getTime()) {
    months -= 1;
    cursor = new Date(now);
    cursor.setMonth(cursor.getMonth() + months);
  }

  const remainderMs = target.getTime() - cursor.getTime();
  const days = Math.floor(remainderMs / MS_PER_DAY);
  const afterDays = remainderMs - days * MS_PER_DAY;
  const hours = Math.floor(afterDays / MS_PER_HOUR);
  const afterHours = afterDays - hours * MS_PER_HOUR;
  const minutes = Math.floor(afterHours / MS_PER_MINUTE);
  const seconds = Math.floor((afterHours - minutes * MS_PER_MINUTE) / 1000);

  return { months, days, hours, minutes, seconds, expired: false };
}

/**
 * Ticks every second toward `targetIso`. Pauses the interval while the tab
 * is hidden (and immediately resyncs on return) to avoid wasted work.
 */
export function useCountdown(targetIso: string): TimeLeft {
  const targetRef = useRef(new Date(targetIso));
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => diff(targetRef.current, new Date()));

  useEffect(() => {
    let intervalId: number | undefined;

    const tick = () => setTimeLeft(diff(targetRef.current, new Date()));

    const start = () => {
      tick();
      intervalId = window.setInterval(tick, 1000);
    };

    const stop = () => {
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
        intervalId = undefined;
      }
    };

    const handleVisibility = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };

    start();
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      stop();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return timeLeft;
}