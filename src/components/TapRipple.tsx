'use client';

import { useEffect, useState } from 'react';

export default function TapRipple() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isTouch = matchMedia('(pointer: coarse)').matches;
    if (!isTouch) return;

    let id = 0;
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      setRipples((r) => [...r, { id: id++, x: t.clientX, y: t.clientY }]);
      setTimeout(() => setRipples((r) => r.slice(1)), 500);
    };
    window.addEventListener('touchstart', onTouch, { passive: true });
    return () => window.removeEventListener('touchstart', onTouch);
  }, []);

  return (
    <>
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none fixed z-[9995] h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-white/10 animate-[ripple_500ms_ease-out]"
          style={{ left: r.x, top: r.y }}
        />
      ))}
      <style jsx global>{`
        @keyframes ripple {
          from { transform: translate(-50%, -50%) scale(0.2); opacity: 0.9; }
          to   { transform: translate(-50%, -50%) scale(1);   opacity: 0; }
        }
      `}</style>
    </>
  );
}
