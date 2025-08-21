'use client';

import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FireCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Enable if ANY pointer is fine (mouse), even on touch laptops
    const fine = window.matchMedia('(any-pointer: fine)').matches;
    setEnabled(fine);
  }, []);

  // Track mouse
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [enabled, x, y]);

  // Springs
  const headX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.7 });
  const headY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.7 });
  const emberX = useSpring(x, { stiffness: 300, damping: 60, mass: 0.9 });
  const emberY = useSpring(y, { stiffness: 300, damping: 60, mass: 0.9 });
  const ember2X = useSpring(x, { stiffness: 200, damping: 80, mass: 1.1 });
  const ember2Y = useSpring(y, { stiffness: 200, damping: 80, mass: 1.1 });

  // Hide OS cursor when active + not reduced motion
  useEffect(() => {
    const body = document.body;
    if (enabled && !prefersReducedMotion) body.classList.add('cursor-none');
    else body.classList.remove('cursor-none');
    return () => body.classList.remove('cursor-none');
  }, [enabled, prefersReducedMotion]);

  if (!enabled) return null;

  // Simple dot if reduced motion
  if (prefersReducedMotion) {
    return (
      <motion.div
        style={{ translateX: headX, translateY: headY }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-2 -mt-2 h-4 w-4 rounded-full bg-white/70"
      />
    );
  }

  return (
    <>
      {/* Dev check: tiny center dot so you can confirm it's mounted */}
      <div className="fixed left-0 top-0 z-[9996] -translate-x-1/2 -translate-y-1/2 h-0 w-0" />

      {/* Main fireball */}
      <motion.div
        style={{ translateX: headX, translateY: headY }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-5 -mt-5 h-10 w-10 mix-blend-screen"
      >
        <svg viewBox="0 0 64 64" className="h-10 w-10">
          <defs>
            <radialGradient id="fireCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fffbe6" />
              <stop offset="40%" stopColor="#ffd166" />
              <stop offset="75%" stopColor="#ff7a00" />
              <stop offset="100%" stopColor="rgba(255,122,0,0)" />
            </radialGradient>
          </defs>
          <circle cx="32" cy="32" r="20" fill="url(#fireCore)" />
          <path
            d="M32 8c6 10-2 12-2 18s6 8 2 14c-2 3-8 4-12 0-3-3-2-7 0-10 3-5 2-9-4-14 9-2 12-7 16-8z"
            fill="url(#fireCore)"
          />
        </svg>
        {/* extra glow that works on dark backgrounds */}
        <div className="absolute inset-0 blur-xl bg-orange-400/40" />
      </motion.div>

      {/* Trail embers */}
      <motion.div
        style={{ translateX: emberX, translateY: emberY }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] -ml-3 -mt-3 h-6 w-6 rounded-full bg-orange-300/40 blur-md mix-blend-screen"
      />
      <motion.div
        style={{ translateX: ember2X, translateY: ember2Y }}
        className="pointer-events-none fixed left-0 top-0 z-[9997] -ml-2 -mt-2 h-4 w-4 rounded-full bg-amber-200/30 blur-md mix-blend-screen"
      />
    </>
  );
}
