// src/components/ToolsMarquee.tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';

type Tool = { id: string; label: string };

const tools: Tool[] = [
  { id: 'react', label: 'React' },
  { id: 'next', label: 'Next.js' },
  { id: 'tailwind', label: 'Tailwind CSS' },
  { id: 'node', label: 'Node.js' },
  { id: 'ts', label: 'TypeScript' },
  { id: 'rn', label: 'React Native' },
  { id: 'shopify', label: 'Shopify' },
  { id: 'xenforo', label: 'XenForo' },
  { id: 'db', label: 'Database' },
  { id: 'maps', label: 'Maps API' },
  { id: 'auth', label: 'Auth' },
  { id: 'git', label: 'Git' },
  { id: 'vercel', label: 'Vercel' },
];

export default function ToolsMarquee() {
  const reduce = useReducedMotion();
  const track = [...tools, ...tools]; // duplicate for seamless loop

  return (
    <section className="relative">
      {/* Centered heading OUTSIDE the bar */}
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-6 text-center">
        <h3 className="text-3xl md:text-5xl font-semibold tracking-tight">
          <span className="text-white">Technologies</span>{' '}
          <span className="text-white/90">& Tools I Use</span>
        </h3>
      </div>

      {/* Scrolling bar */}
      <div className="relative border-y border-white/10 bg-white/[0.04]">
        <div className="mx-auto max-w-7xl px-6 py-6 overflow-hidden">
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0b1625] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0b1625] to-transparent" />

          <motion.div
            className="flex gap-3 min-w-max"
            animate={reduce ? undefined : { x: ['-50%', '0%'] }}
            transition={reduce ? undefined : { duration: 30, ease: 'linear', repeat: Infinity }}
          >
            {track.map((t, i) => (
              <span
                key={`${t.id}-${i}`}
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 px-3 py-1.5 text-sm"
              >
                <Icon id={t.id} />
                {t.label}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Icon({ id }: { id: string }) {
  const common = 'h-4 w-4';
  switch (id) {
    case 'react':
    case 'rn':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="2.2" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-60 12 12)" />
        </svg>
      );
    case 'next':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor">
          <path d="M12 2a10 10 0 1 0 6.9 17.3L9.7 6.1A8 8 0 0 1 12 2z" />
          <path d="M14.3 12.7 19 19a10 10 0 0 0-2.2-12.7 10 10 0 0 0-1.3-1.1v7.5z" />
        </svg>
      );
    case 'tailwind':
      return (
        <svg viewBox="0 0 48 24" className={common} fill="currentColor">
          <path d="M12 6c3.3 0 5.3 1.7 6 5 1-3.3 3-5 6-5 3.3 0 5.3 1.7 6 5-1 3.3-3 5-6 5-3.3 0-5.3-1.7-6-5-1 3.3-3 5-6 5-3.3 0-5.3-1.7-6-5 1-3.3 3-5 6-5z" />
        </svg>
      );
    case 'node':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor">
          <path d="M12 2 3 7v10l9 5 9-5V7l-9-5zm0 3.3 6 3.3v6.8l-6 3.3-6-3.3V8.6l6-3.3z" />
        </svg>
      );
    case 'ts':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M8 8h8v2h-3v6h-2v-6H8V8z" fill="#0b1625" />
        </svg>
      );
    case 'shopify':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor">
          <path d="M5 6 13 4l6 2v12l-8 2-6-2V6z" />
        </svg>
      );
    case 'xenforo':
      return <span className="text-xs font-semibold">XF</span>;
    case 'db':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor">
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v8c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
        </svg>
      );
    case 'maps':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 21s6-5.3 6-10A6 6 0 0 0 6 11c0 4.7 6 10 6 10z" />
          <circle cx="12" cy="11" r="2.2" />
        </svg>
      );
    case 'auth':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="4" y="7" width="16" height="12" rx="2" />
          <path d="M9 7V5a3 3 0 0 1 6 0v2" />
        </svg>
      );
    case 'git':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor">
          <path d="M4 12 12 4l8 8-8 8-8-8zm8-6v12m-4-8 8 8" />
        </svg>
      );
    case 'vercel':
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor">
          <path d="M12 4 22 20H2L12 4z" />
        </svg>
      );
    default:
      return <span className="h-4 w-4 rounded-full bg-white/60 inline-block" />;
  }
}
