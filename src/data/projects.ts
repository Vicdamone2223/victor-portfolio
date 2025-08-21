// src/data/projects.ts

export type Project = {
  slug: string;
  title: string;
  /** Public/live URL for the project (optional) */
  live?: string;

  /** One-liner used in metadata/snippets */
  summary?: string;

  /** Your roles on the project */
  role?: string[];

  /** Tech stack / frameworks */
  stack?: string[];

  /** Extra tools/services used */
  tools?: string[];

  /** Screenshot paths (served from /public) */
  images?: string[];

  /**
   * Selects JSON-LD type:
   *  - "WebSite" for websites
   *  - "SoftwareApplication" for apps (your directory app)
   *  - "CreativeWork" if neither applies
   */
  type?: "WebSite" | "SoftwareApplication" | "CreativeWork";
};

export const projects: Project[] = [
  {
    slug: "ablackweb",
    title: "A Black Web",
    live: "https://ablackweb.com",
    summary:
      "Hip-Hop/community forum with heavy daily engagement. I maintain platform UX, theming, and performance.",
    role: ["Frontend", "Backend", "Maintenance"],
    stack: ["XenForo", "Custom theme", "Add-ons"],
    tools: ["Analytics", "Moderation tooling"],
    images: [
      "/desktopforumhome.png",
      "/desktopforumpost.png",
      "/mobileforumhome.jpg",
      "/mobileforumpost.jpg",
    ],
    type: "WebSite",
  },
  {
    slug: "perfumedefrance",
    title: "Parfum de France",
    live: "https://perfumedefrance.com",
    summary:
      "E-commerce refresh on existing Shopify stack—modern UI, cleaner collections, and faster product browsing.",
    role: ["Frontend", "Theme development", "Performance"],
    stack: ["Shopify (Liquid)", "JavaScript", "CSS"],
    tools: ["Payments", "Analytics", "Theme apps"],
    images: [
      "/desktopperfumehome.png",
      "/desktopperforumproducts.png",
      "/mobileperfumehome.jpg",
      "/mobileperfumeproduct.jpg",
    ],
    type: "WebSite",
  },
  {
    slug: "certifiedhealthacademy",
    title: "Certified Health Academy",
    live: "https://certifiedhealthacademy.com",
    summary:
      "Health training site built end-to-end—no site builders. Clean IA, fast loads, and clear enrollment flows.",
    role: ["Design", "Frontend", "Backend", "Deployment"],
    stack: ["Custom HTML/CSS/JS", "Custom backend"],
    tools: ["Email", "Forms"],
    images: [
      "/desktopcoursehome.png",
      "/desktopcoursepage.png",
      "/mobilecoursehome.jpg",
      "/mobilecoursepage.jpg",
    ],
    type: "WebSite",
  },
  {
    slug: "ablackmarketplace",
    title: "A Black Marketplace",
    summary:
      "Business directory app with location search, open/closed status, categories, and owner profiles; wrapping closed test before Play Store release.",
    role: ["Full-stack"],
    stack: ["React Native", "Node.js API", "Database"],
    tools: ["Maps", "Auth", "Push notifications"],
    images: ["/apphome.jpg", "/appcategorylist.jpg", "/appbusinesspage.jpg"],
    type: "SoftwareApplication",
  },
];
