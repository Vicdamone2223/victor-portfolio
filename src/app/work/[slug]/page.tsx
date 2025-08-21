import Image from "next/image";
import Link from "next/link";
import { projects } from "../../../data/projects";

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const proj = projects.find(p => p.slug === params.slug);
  if (!proj) return <div className="px-6 py-20">Not found.</div>;

  return (
    <main className="px-6 py-14 max-w-6xl mx-auto">
      <Link href="/" className="text-white/60 hover:text-white">← Back</Link>
      <h1 className="mt-4 text-4xl font-semibold">{proj.title}</h1>
      <p className="mt-2 text-white/70">{proj.summary}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {proj.stack.map(s => <span key={s} className="rounded-full bg-white/10 border border-white/10 px-3 py-1 text-sm">{s}</span>)}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {proj.role.map(r => <span key={r} className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs uppercase tracking-wide text-white/70">{r}</span>)}
      </div>

      {proj.live && (
        <a href={proj.live} target="_blank" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white text-slate-900 px-5 py-3 font-medium">
          View live site ↗
        </a>
      )}

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {proj.images.map(src => (
          <div key={src} className="relative overflow-hidden rounded-xl border border-white/10 bg-black/20">
            <Image src={src} alt={`${proj.title} screenshot`} width={1600} height={1200}
              className={src.includes("app") ? "aspect-[9/16] object-cover" : "aspect-[16/10] object-cover"} />
          </div>
        ))}
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}
