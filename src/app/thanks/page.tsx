// src/app/thanks/page.tsx
import Link from "next/link";

export default function ThanksPage() {
  return (
    <main className="min-h-[70vh] px-6 py-28 bg-[#0b1625] text-white">
      {/* subtle bg */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_70%_10%,#10263d,transparent),linear-gradient(180deg,#0b1625,#0e1b2a)]" />
      <div className="absolute inset-0 -z-10 [mask-image:radial-gradient(60%_60%_at_70%_40%,#000_50%,transparent)] bg-[linear-gradient(#123_1px,transparent_1px),linear-gradient(90deg,#123_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-6 h-16 w-16 rounded-2xl border border-white/10 bg-white/10 flex items-center justify-center">
          {/* checkmark */}
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold">Thanks—message received!</h1>
        <p className="mt-3 text-white/70">
          I’ll read it and get back to you soon. Meanwhile, feel free to check out more work or say hi on socials.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="rounded-2xl bg-white text-slate-900 px-5 py-3 font-medium shadow-md hover:shadow-lg transition">
            Go back home
          </Link>
          <a
            href="#work"
            className="rounded-2xl border border-white/15 px-5 py-3 text-white/90 hover:bg-white/5 transition"
          >
            See my work
          </a>
        </div>
      </div>
    </main>
  );
}
