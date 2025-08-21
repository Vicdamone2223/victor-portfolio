// src/app/work/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects } from "../../../data/projects";

// Helper: build JSON-LD per project type
function buildProjectJsonLd(p: any) {
  const base = {
    "@context": "https://schema.org",
    name: p.title,
    url: p.live || `https://victordigitalmedia.com/work/${p.slug}`,
    image: Array.isArray(p.images) ? p.images[0] : undefined,
    description: p.summary,
  };

  switch (p.type) {
    case "SoftwareApplication":
      return {
        ...base,
        "@type": "SoftwareApplication",
        applicationCategory: "WebApplication",
        operatingSystem: "Any",
        // Optional extras:
        // offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      };
    case "WebSite":
      return { ...base, "@type": "WebSite" };
    default:
      return { ...base, "@type": "CreativeWork" };
  }
}

// Dynamic metadata per project
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const proj = projects.find((p) => p.slug === params.slug);

  if (!proj) {
    return {
      title: "Project not found | Victor Digital Media",
      robots: { index: false, follow: false },
    };
  }

  const canonical = `https://victordigitalmedia.com/work/${proj.slug}`;
  const ogImage =
    (Array.isArray(proj.images) && proj.images[0]) || "https://victordigitalmedia.com/og.jpg";

  return {
    title: `${proj.title} — Project`,
    description: proj.summary || "Project case study by Victor Digital Media.",
    alternates: { canonical },
    openGraph: {
      title: `${proj.title} — Project`,
      description: proj.summary,
      url: canonical,
      siteName: "Victor Digital Media",
      images: [{ url: ogImage }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${proj.title} — Project`,
      description: proj.summary,
      images: [ogImage],
    },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const proj = projects.find((p) => p.slug === params.slug);
  if (!proj) return <div className="px-6 py-20">Not found.</div>;

  const canonical = `https://victordigitalmedia.com/work/${proj.slug}`;

  // JSON-LD: Project + Breadcrumbs
  const projectJsonLd = buildProjectJsonLd(proj);
  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://victordigitalmedia.com/" },
      { "@type": "ListItem", position: 2, name: "Work", item: "https://victordigitalmedia.com/work" },
      { "@type": "ListItem", position: 3, name: proj.title, item: canonical },
    ],
  };

  return (
    <main className="px-6 py-14 max-w-6xl mx-auto">
      <Link href="/work" className="text-white/60 hover:text-white">← Back</Link>

      <h1 className="mt-4 text-4xl font-semibold">{proj.title}</h1>
      {proj.summary && <p className="mt-2 text-white/70">{proj.summary}</p>}

      {Array.isArray(proj.stack) && proj.stack.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {proj.stack.map((s: string) => (
            <span
              key={s}
              className="rounded-full bg-white/10 border border-white/10 px-3 py-1 text-sm"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      {Array.isArray(proj.role) && proj.role.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {proj.role.map((r: string) => (
            <span
              key={r}
              className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs uppercase tracking-wide text-white/70"
            >
              {r}
            </span>
          ))}
        </div>
      )}

      {proj.live && (
        <a
          href={proj.live}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white text-slate-900 px-5 py-3 font-medium"
        >
          View live site ↗
        </a>
      )}

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {Array.isArray(proj.images) &&
          proj.images.map((src: string) => (
            <div
              key={src}
              className="relative overflow-hidden rounded-xl border border-white/10 bg-black/20"
            >
              <Image
                src={src}
                alt={`${proj.title} screenshot`}
                width={1600}
                height={1200}
                className={
                  src.includes("app")
                    ? "aspect-[9/16] object-cover"
                    : "aspect-[16/10] object-cover"
                }
              />
            </div>
          ))}
      </div>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
    </main>
  );
}

// Static params for SSG
export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
