// src/components/ContactCard.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function ContactCard() {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const email = 'ablackweb@gmail.com'; // ← your email
  const [origin, setOrigin] = useState<string>('');
  useEffect(() => {
    if (typeof window !== 'undefined') setOrigin(window.location.origin);
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }

  return (
    <section id="contact" className="px-6 py-20 bg-white/5">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.35)]"
        >
          {/* soft accent glows */}
          {!reduce && (
            <>
              <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-violet-400/10 blur-3xl" />
            </>
          )}

          <div className="grid gap-10 lg:grid-cols-2">
            {/* Left: copy + social */}
            <div>
              <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs tracking-wide text-white/80">
                Contact
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-semibold">
                Let’s build something great together
              </h2>
              <p className="mt-3 text-white/70">
                Tell me about your idea—website, app, e-commerce, or something wild.
                I’ll reply with a simple plan and options.
              </p>

              <div className="mt-6 space-y-3">
                {/* Email row */}
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <MailIcon />
                    <span className="text-white/90">{email}</span>
                  </div>
                  <button
                    onClick={copyEmail}
                    className="rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15 active:scale-95 transition"
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>

                {/* Social row */}
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/call.me.goldie/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 hover:bg-white/15 active:scale-95 transition"
                    aria-label="Instagram"
                  >
                    <InstagramIcon />
                  </a>
                  <a
                    href="https://x.com/aBlackWebDotCom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 hover:bg-white/15 active:scale-95 transition"
                    aria-label="X (Twitter)"
                  >
                    <XIcon />
                  </a>
                </div>

                {/* Quick CTA */}
                <div className="pt-3">
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 rounded-2xl bg-white text-slate-900 px-5 py-3 font-medium shadow-md hover:shadow-lg active:scale-95 transition"
                  >
                    Email me directly <span>↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: form (FormSubmit) */}
            <form
              action={`https://formsubmit.co/${email}`}
              method="POST"
              className="grid grid-cols-1 gap-4"
            >
              {/* FormSubmit helpers */}
              {/* prevent bots */}
              <input type="text" name="_honey" className="hidden" />
              {/* subject & captcha */}
              <input type="hidden" name="_subject" value="New inquiry from Victor Digital Media" />
              <input type="hidden" name="_captcha" value="false" />
              {/* redirect to /thanks (absolute URL) */}
              {origin && <input type="hidden" name="_next" value={`${origin}/thanks`} />}
              {/* set reply-to header */}
              <input type="hidden" name="_replyto" value="{email}" />

              <div className="grid sm:grid-cols-2 gap-4">
                <FormField label="Name" htmlFor="name">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-3 outline-none placeholder:text-white/40 focus:ring-2 focus:ring-white/20"
                  />
                </FormField>
                <FormField label="Email" htmlFor="email">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@domain.com"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-3 outline-none placeholder:text-white/40 focus:ring-2 focus:ring-white/20"
                  />
                </FormField>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <FormField label="Project type" htmlFor="type">
  <select
    id="type"
    name="project_type"
    className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-3 outline-none focus:ring-2 focus:ring-white/20"
    defaultValue="Website"
  >
    <option>Website</option>
    <option>App</option>
  </select>
</FormField>

                <FormField label="Budget" htmlFor="budget">
  <select
    id="budget"
    name="budget"
    className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-3 outline-none focus:ring-2 focus:ring-white/20"
    defaultValue="$2K - 5K"
  >
    <option>$2K - 5K</option>
    <option>$6K - 9K</option>
    <option>10K and Up</option>
  </select>
</FormField>

              </div>

              <FormField label="Project details" htmlFor="message">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me what you’re building, goals, timeline, and must-haves."
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-3 outline-none placeholder:text-white/40 focus:ring-2 focus:ring-white/20"
                />
              </FormField>

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <label className="text-xs text-white/60">
                  This form emails me directly. I’ll reply within 1–2 business days.
                </label>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-slate-900 px-6 py-3 font-medium shadow-md hover:shadow-lg active:scale-95 transition"
                >
                  Send message <span>↗</span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- icons & helpers ---------------- */

function FormField({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <div className="mb-1 text-xs uppercase tracking-wide text-white/60">{label}</div>
      {children}
    </label>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M4 4h4.5l4 5.4L17 4h3l-6.8 8.7L20 20h-4.5l-4.3-5.7L7 20H4l7-9.1L4 4z" />
    </svg>
  );
}
