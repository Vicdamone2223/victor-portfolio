'use client';

import { useReducedMotion } from 'framer-motion';

export default function MobileAurora({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
      aria-hidden
    >
      <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full blur-3xl opacity-25"
           style={{ background: 'radial-gradient(closest-side, #34d399, transparent)' }} />
      <div className="absolute top-10 right-0 h-72 w-72 rounded-full blur-3xl opacity-25"
           style={{ background: 'radial-gradient(closest-side, #60a5fa, transparent)' }} />
      <div className="absolute -bottom-8 left-1/3 h-64 w-64 rounded-full blur-3xl opacity-25"
           style={{ background: 'radial-gradient(closest-side, #f472b6, transparent)' }} />

      <style jsx>{`
        /* gentle float; GPU-friendly transforms */
        div > div {
          animation: aurora-float 14s ease-in-out infinite;
        }
        div > div:nth-child(2) { animation-duration: 18s; animation-delay: .6s; }
        div > div:nth-child(3) { animation-duration: 16s; animation-delay: 1.2s; }

        @keyframes aurora-float {
          0%, 100% { transform: translate3d(0,0,0) scale(1); }
          50%      { transform: translate3d(0,-8px,0) scale(1.05); }
        }
      `}</style>
    </div>
  );
}
