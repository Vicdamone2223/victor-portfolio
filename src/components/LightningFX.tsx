'use client';

import { useReducedMotion } from 'framer-motion';
import clsx from 'clsx';

export default function LightningFX({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return null; // respect accessibility

  return (
    <div
      className={clsx(
        'pointer-events-none absolute inset-0 -z-10',
        'opacity-60',                 // overall intensity
        className
      )}
      aria-hidden
    >
      <svg
        viewBox="0 0 1200 800"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
      >
        <defs>
          {/* electric gradient along the stroke */}
          <linearGradient id="bolt-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"  stopColor="#00E5FF" stopOpacity="0"/>
            <stop offset="50%" stopColor="#7DD3FC" stopOpacity="1"/>
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0"/>
          </linearGradient>

          {/* soft outer glow */}
          <filter id="bolt-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Left bolt */}
        <path
          d="M80 140 L220 190 L160 260 L320 310 L270 370 L430 420"
          className="bolt bolt-a"
          stroke="url(#bolt-grad)"
        />
        {/* Right bolt */}
        <path
          d="M1100 120 L960 170 L1010 230 L860 270 L910 330 L760 380"
          className="bolt bolt-b"
          stroke="url(#bolt-grad)"
        />
        {/* Bottom bolt */}
        <path
          d="M200 520 L340 560 L280 620 L420 660 L360 720"
          className="bolt bolt-c"
          stroke="url(#bolt-grad)"
        />
      </svg>

      {/* Scoped styles */}
      <style jsx>{`
        .bolt {
          fill: none;
          stroke-width: 2;
          filter: url(#bolt-glow);
          stroke-linejoin: round;
          stroke-linecap: round;
          /* moving "charge" */
          stroke-dasharray: 6 140;
          animation: bolt-dash 9s linear infinite, bolt-flash 9s ease-in-out infinite;
          opacity: 0.0; /* stays invisible between flashes */
        }

        /* Slightly different timings so they don't all flash together */
        .bolt-a { animation-delay: 1.2s, 1.2s; }
        .bolt-b { animation-delay: 2.6s, 2.6s; }
        .bolt-c { animation-delay: 4.1s, 4.1s; }

        @keyframes bolt-dash {
          from { stroke-dashoffset: 0;   }
          to   { stroke-dashoffset: -1200; }
        }

        /* Quick flash -> afterglow -> fade */
        @keyframes bolt-flash {
          0%, 91%   { opacity: 0; }
          92%       { opacity: .9; }
          94%       { opacity: .25; }
          96%       { opacity: .7; }
          100%      { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
