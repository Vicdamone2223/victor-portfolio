'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function FireCursor() {
  // Only enable on devices that actually have a mouse cursor
  const [enabled, setEnabled] = useState(false);

  // Smoothed position
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Desktop-only: requires hover + fine pointer (mouse/trackpad)
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const onChange = () => setEnabled(mq.matches);
    onChange();

    // Listen for device changes (e.g., plugging in a mouse)
    const add = mq.addEventListener ?? mq.addListener;
    const remove = mq.removeEventListener ?? mq.removeListener;
    add.call(mq, 'change', onChange);

    // Only bind mousemove when enabled
    const onMove = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    if (mq.matches) window.addEventListener('mousemove', onMove);

    return () => {
      if (mq.matches) window.removeEventListener('mousemove', onMove);
      remove.call(mq, 'change', onChange);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      style={{ translateX: sx, translateY: sy }}
      className="pointer-events-none fixed z-[9999] left-0 top-0"
      aria-hidden
    >
      {/* simple flame blob; tweak as you like */}
      <div className="relative h-6 w-6">
        <span className="absolute inset-0 rounded-full bg-orange-400/70 blur-[6px]" />
        <span className="absolute inset-0 rounded-full bg-amber-300/90 mix-blend-screen" />
      </div>
    </motion.div>
  );
}
