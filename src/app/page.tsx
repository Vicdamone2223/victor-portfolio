// src/app/page.tsx
import type { Metadata } from "next";
import Hero from "../components/Hero";
import ToolsMarquee from "../components/ToolsMarquee";
import ProjectsList from "../components/ProjectsList";
import ContactCard from "../components/ContactCard";

export const metadata: Metadata = {
  title: "Web & App Developer Portfolio — VA • MD • DC",
  description:
    "I build fast, modern websites and custom directory apps for small businesses and creators. View recent projects and book a quick consult.",
  alternates: { canonical: "https://victordigitalmedia.com/" },
};

export default function Page() {
  // JSON-LD: Breadcrumbs (home)
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://victordigitalmedia.com/",
      },
    ],
  };

  return (
    <main className="bg-[#0b1625] text-white">
      <Hero />
      <ToolsMarquee />
      <ProjectsList />
      <ContactCard />

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </main>
  );
}
