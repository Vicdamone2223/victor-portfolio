
import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowUpRight,
  HeartHandshake,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Victor Bradford | My Projects",
  description:
    "Explore the businesses, platforms, and community initiatives built by Victor Bradford.",
};

const projects = [
  {
    name: "A Black Marketplace",
    category: "DISCOVER",
    description: "Discover and support Black-owned businesses.",
    url: "https://apps.apple.com/us/app/a-black-marketplace/id6754783700",
    logo: "/logos/abm.jpg",
    initials: "ABM",
    color: "#D6C19A",
  },
  {
    name: "Stay Blessed DMV",
    category: "IMPACT",
    description: "Showing up for our community.",
    url: "https://stayblesseddmv.com",
    logo: "",
    initials: "",
    color: "#F28A45",
  },
  {
    name: "A Black Web",
    category: "COMMUNITY",
    description: "Where culture and community connect.",
    url: "https://ablackweb.com",
    logo: "/logos/abw.jpg",
    initials: "ABW",
    color: "#D6C19A",
  },
  {
    name: "How Many Mics",
    category: "CULTURE",
    description: "Hip-hop ratings, reviews, and culture.",
    url: "https://howmanymics.com",
    logo: "/logos/hmm.png",
    initials: "HMM",
    color: "#D6C19A",
  },
  {
    name: "Victor Digital Media",
    category: "SERVICES",
    description: "Custom websites and digital experiences.",
    url: "https://victordigitalmedia.com",
    logo: "",
    initials: "VDM",
    color: "#D6C19A",
  },
];

export default function LinksPage() {
  return (
    <main className="min-h-screen bg-[#17191C] px-5 py-12 text-white sm:px-6">
      <div className="mx-auto max-w-[540px]">

        {/* Profile */}
        <header className="mb-12 flex flex-col items-center text-center">

          {/* Profile photo */}
          <div className="relative mb-5 h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-[#D6C19A] bg-[#30343A]">
            <Image
              src="/victor-profile.jpg"
              alt="Victor Bradford"
              fill
              sizes="96px"
              priority
              className="object-cover object-[center_30%]"
            />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight">
            Victor Bradford
          </h1>

          <p className="mt-3 text-xs font-medium tracking-wide text-[#D6C19A] sm:text-sm">
            Developer · Entrepreneur · Community Builder
          </p>

          <p className="mt-4 max-w-[360px] text-sm leading-6 text-[#B5B7BC]">
            Building digital platforms that connect people, culture,
            and opportunity.
          </p>
        </header>

        {/* Section heading */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-semibold tracking-tight">
            Explore My Projects
          </h2>

          <span className="text-[10px] font-medium tracking-[0.15em] text-[#92959B]">
            EST. 2017
          </span>
        </div>

        {/* Project cards */}
        <div className="space-y-3">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-[#34373C] bg-[#25282D] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#8B7856] hover:bg-[#2C3036]"
            >

              {/* Business logo or placeholder */}
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#383C43]">
                {project.logo ? (
                  <Image
                    src={project.logo}
                    alt={`${project.name} logo`}
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                ) : project.name === "Stay Blessed DMV" ? (
                  <HeartHandshake
                    size={30}
                    className="text-[#F28A45]"
                  />
                ) : (
                  <span
                    className="text-lg font-semibold tracking-tight"
                    style={{ color: project.color }}
                  >
                    {project.initials}
                  </span>
                )}
              </div>

              {/* Project details */}
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-[10px] font-semibold tracking-[0.13em] text-[#D6C19A]">
                  {project.category}
                </p>

                <h3 className="text-[15px] font-semibold text-white">
                  {project.name}
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#ADB0B7]">
                  {project.description}
                </p>
              </div>

              {/* Arrow */}
              <ArrowUpRight
                size={19}
                className="shrink-0 text-[#D6C19A] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-12 flex flex-col items-center gap-6">

          {/* Instagram */}
          <a
            href="https://www.instagram.com/call.me.vicdamone/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Vic Damone on Instagram"
            className="text-[#B5B7BC] transition-colors hover:text-[#D6C19A]"
          >
            <span className="text-sm font-semibold">
              IG
            </span>
          </a>

          {/* Copyright */}
          <p className="text-xs text-[#777B82]">
            © {new Date().getFullYear()} Victor Bradford
          </p>

        </footer>
      </div>
    </main>
  );
}
