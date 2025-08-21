// src/components/ProjectsGrid.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { projects } from '../data/projects';

export default function ProjectsGrid() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="work" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-semibold">Recent Work</h2>
        <p className="text-white/70 mt-2">A snapshot of platforms I’ve built and shipped.</p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectRow
              key={p.slug}
              project={p}
              index={i}
              prefersReducedMotion={!!prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({
  project: p,
  index,
  prefersReducedMotion,
}: {
  project: (typeof projects)[number];
  index: number;
  prefersReducedMotion: boolean;
}) {
  const ctaHref = p.live ?? `/work/${p.slug}`;
  const ctaLabel = p.live ? 'Visit site' : 'View details';
  const external = Boolean(p.live);

  // ✅ Safely pick first image, if present
  const heroImg =
    Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : undefined;
  const isApp = typeof heroImg === 'string' && heroImg.includes('app');

  // ✅ Safely handle optional arrays
  const stack = Array.isArray(p.stack) ? p.stack : [];
  const roles = Array.isArray(p.role) ? p.role : [];

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.04 }}
      className="relative rounded-3xl border border-white/10 bg-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.35)] overflow-hidden"
    >
      <div className="grid gap-6 p-5 sm:p-6 lg:p-8 items-center">
        {/* Text */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">{p.title}</h3>
          {p.summary && <p className="text-white/70">{p.summary}</p>}

          {/* Built with */}
          {stack.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-white/7 border border-white/10 px-3 py-1 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Roles */}
          {roles.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {roles.map((r) => (
                <span
                  key={r}
                  className="inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs uppercase tracking-wide text-white/75"
                >
                  {r}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="pt-3">
            <Link
              href={ctaHref}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 rounded-2xl bg-white text-slate-900 px-5 py-3 font-medium shadow-md hover:shadow-lg transition"
            >
              {ctaLabel} <span>↗</span>
            </Link>
          </div>
        </div>

        {/* Image */}
        <motion.div
          whileHover={
            prefersReducedMotion
              ? {}
              : { y: -6, scale: 1.02, boxShadow: '0 20px 60px rgba(0,0,0,0.45)' }
          }
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <div className="relative mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-3">
            <div className="flex gap-2 pb-3 px-1">
              <span className="h-3 w-3 rounded-full bg-red-400/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-300/70" />
              <span className="h-3 w-3 rounded-full bg-green-400/70" />
            </div>
            <div className="relative overflow-hidden rounded-xl">
              {heroImg ? (
                <Image
                  src={heroImg}
                  alt={`${p.title} screenshot`}
                  width={1400}
                  height={isApp ? 2200 : 900}
                  className={`${isApp ? 'aspect-[9/16]' : 'aspect-[16/10]'} object-cover`}
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center rounded-xl border border-white/10 bg-black/20 text-white/50">
                  No image
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}
