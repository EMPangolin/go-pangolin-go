import { useEffect, useRef, useState } from 'react';

export function useCountUp(target: number | null, duration = 1200) {
  const [display, setDisplay] = useState<number | null>(null);
  const frame = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (target === null || Number.isNaN(target)) return;

    const start = performance.now();
    const from = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(from + (target - from) * eased);
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [target, duration]);

  return display;
}
