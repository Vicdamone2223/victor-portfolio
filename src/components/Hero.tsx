// src/components/Hero.tsx
'use client';

import Image from 'next/image';
import { motion, useMotionValue, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import LightningFX from './LightningFX';

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // hover tilt (desktop only)
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const midX = r.width / 2, midY = r.height / 2;
    rotateY.set(((x - midX) / midX) * 6);
    rotateX.set(-((y - midY) / midY) * 6);
  }

  // scroll parallax (must not call useTransform conditionally)
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [20, -20]); // always called

  return (
    <section className="relative isolate overflow-hidden pt-20 md:pt-36 lg:pt-40 pb-2 min-h-[70vh] flex items-start">
      {/* background layers */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_70%_10%,#10263d,transparent),linear-gradient(180deg,#0b1625,#0e1b2a)]" />
      <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(60%_60%_at_70%_40%,#000_50%,transparent)] bg-[linear-gradient(#123_1px,transparent_1px),linear-gradient(90deg,#123_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* ⚡ Lightning FX (desktop+ only; respects reduced motion) */}
      <LightningFX className="hidden md:block" />

      {/* image first on mobile, text first on desktop */}
      <div className="mx-auto w-full max-w-6xl px-6 grid gap-10 items-center lg:grid-cols-2">
        {/* IMAGE CARD */}
        <motion.div
          ref={cardRef}
          onMouseMove={prefersReducedMotion ? undefined : handleMouse}
          onMouseLeave={() => { rotateX.set(0); rotateY.set(0); }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={prefersReducedMotion ? {} : { scale: 1.02, boxShadow: '0 20px 60px rgba(0,0,0,0.45)' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          style={{ y: prefersReducedMotion ? 0 : yParallax, rotateX, rotateY, transformPerspective: 1000 }}
          className="order-1 lg:order-2 relative mx-auto w-full sm:max-w-lg rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-2 sm:p-3 shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
        >
          <div className="flex gap-2 pb-3 px-1">
            {['bg-red-400/70','bg-yellow-300/70','bg-green-400/70'].map((c, i) => (
              <motion.span
                key={i}
                className={`h-3 w-3 rounded-full ${c}`}
                animate={prefersReducedMotion ? undefined : { opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src="/victor-hero.png"
              alt="Victor coding — web & app developer"
              width={960}
              height={720}
              priority
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover aspect-[5/4] sm:aspect-[4/3]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-[#0e1b2a]/60 via-transparent to-transparent" />
          </div>
        </motion.div>

        {/* TEXT / SOCIAL */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="order-2 lg:order-1 max-w-xl mx-auto lg:mx-0 text-center lg:text-left"
        >
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs tracking-wide text-white/80">
            Victor Digital Media
          </span>

          <h1 className="mt-4 text-4xl md:text-5xl font-semibold text-white leading-tight">
            Bringing Visions To Digital Life
          </h1>

          {/* Social badges */}
          <div className="mt-4 flex items-center gap-2 justify-center lg:justify-start">
            <a
              href="https://www.instagram.com/call.me.goldie/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 active:scale-95 transition"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="3.5" />
                <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="https://x.com/aBlackWebDotCom"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter (X)"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 border border-white/10 hover:bg-white/15 active:scale-95 transition"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M4 4h4.5l4 5.4L17 4h3l-6.8 8.7L20 20h-4.5l-4.3-5.7L7 20H4l7-9.1L4 4z" />
              </svg>
            </a>
          </div>

          <div className="mt-6 flex gap-3 justify-center lg:justify-start">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-2xl bg-white text-slate-900 px-5 py-3 font-medium shadow-md hover:shadow-lg active:scale-95 transition"
            >
              See my work <span className="transition group-hover:translate-x-0.5">→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-5 py-3 text-white/90 hover:bg-white/5 active:scale-95 transition"
            >
              Get in touch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
