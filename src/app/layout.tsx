// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "../components/Header";
import FireCursor from "../components/FireCursor";
import TapRipple from "../components/TapRipple";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://victordigitalmedia.com"),
  title: {
    default: "Victor Digital Media — Web & App Developer",
    template: "%s | Victor Digital Media",
  },
  description:
    "Web & app developer building fast, modern sites and custom directory apps for small businesses and creators.",
  alternates: {
    canonical: "/",
  },
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    url: "https://victordigitalmedia.com",
    siteName: "Victor Digital Media",
    title: "Victor Digital Media — Web & App Developer",
    description:
      "Modern websites and custom apps that convert. Portfolio, case studies, and contact.",
    // images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Victor Digital Media" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Victor Digital Media — Web & App Developer",
    description:
      "Modern websites and custom apps that convert. Portfolio, case studies, and contact.",
    // images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
  // If you have a Google Search Console token, uncomment:
  // verification: { google: "paste-your-code" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // ---------- Site-wide JSON-LD ----------
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Victor",
    url: "https://victordigitalmedia.com",
    jobTitle: "Web & App Developer",
    // Add links if you want:
    // sameAs: ["https://github.com/yourhandle", "https://www.linkedin.com/in/yourhandle/"],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Victor Digital Media",
    url: "https://victordigitalmedia.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://victordigitalmedia.com/work?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0b1625] text-white`}
      >
        <Header />
        {children}

        {/* Visual effects (desktop cursor + mobile tap ripple) */}
        <FireCursor />
        <TapRipple />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
