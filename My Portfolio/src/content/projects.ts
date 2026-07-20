import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "ember-reach-production",
    title: "Ember Reach — Full Production",
    role: "Designer, Artist, Programmer",
    summary:
      "End-to-end production of a compact action adventure: systems, art, and shipping.",
    description:
      "I scoped Ember Reach as a finished short experience rather than an open-ended prototype. That meant locking pillars early, building art and systems in parallel, and cutting anything that threatened a clean release.\n\nThe result is a playable product with a coherent visual identity and a production process I now reuse for commissions and other titles.",
    outcomes: [
      "Shipped a complete short campaign with original environments and UI",
      "Established a reusable art-to-engine pipeline for 2D production",
      "Documented scope decisions that keep future projects release-shaped",
    ],
    images: [
      "/images/work/ember-reach-work-1.svg",
      "/images/work/ember-reach-work-2.svg",
    ],
    coverImage: "/images/work/ember-reach-work.svg",
    year: 2025,
    tags: ["Game", "Unity", "Original Art"],
    links: [
      { label: "View product", href: "/products/ember-reach" },
      { label: "itch.io", href: "https://auguste.itch.io" },
    ],
    featured: true,
  },
  {
    slug: "signal-desk-tooling",
    title: "Signal Desk — Indie Production Tool",
    role: "Product Designer & Engineer",
    summary:
      "A desktop workspace for milestones, builds, and art queues without enterprise weight.",
    description:
      "Signal Desk came from managing my own productions across notes apps and spreadsheets. I designed a calm interface for solo and small-team workflows, then implemented the core desk experience as a purchasable product.",
    outcomes: [
      "Shipped a focused productivity tool for game teams",
      "Reduced context-switching across task, build, and art notes",
      "Validated demand through itch.io distribution",
    ],
    images: ["/images/work/signal-desk-work-1.svg"],
    coverImage: "/images/work/signal-desk-work.svg",
    year: 2025,
    tags: ["Software", "Tooling", "UX"],
    links: [
      { label: "View product", href: "/products/signal-desk" },
      { label: "itch.io", href: "https://auguste.itch.io" },
    ],
    featured: true,
  },
  {
    slug: "studio-prototype-support",
    title: "Vertical Slice Support — Client Studio",
    role: "Contract Developer & Artist",
    summary:
      "Helped a small studio clarify a vertical slice: systems, art pass, and review builds.",
    description:
      "A small studio needed a vertical slice that looked and played intentional for publisher conversations. I joined for a defined window: tighten core loop feedback, complete a focused art pass, and package review builds with clear notes.\n\nWork stayed scoped to the slice — no open-ended retainers, no scope creep.",
    outcomes: [
      "Delivered a playable slice with coherent art and feedback loops",
      "Produced review builds stakeholders could evaluate without hand-holding",
      "Left behind notes the team could continue from after handoff",
    ],
    images: ["/images/work/studio-slice-1.svg"],
    coverImage: "/images/work/studio-slice.svg",
    year: 2024,
    tags: ["Commission", "Vertical Slice", "Art + Code"],
    links: [],
    featured: true,
  },
  {
    slug: "hollow-coast-pipeline",
    title: "Hollow Coast — Environment Art Pipeline",
    role: "Artist & Technical Artist",
    summary:
      "Built a tile and prop kit with layering rules that stay consistent across scenes.",
    description:
      "Hollow Coast started as environment art for a personal project and became a packaged kit. I defined tile rules, prop density guidance, and lighting references so scenes stay cohesive when reused in other projects.",
    outcomes: [
      "Published a royalty-free environment kit on itch.io",
      "Documented layering and lighting for consistent scene building",
      "Created a template for future asset pack releases",
    ],
    images: ["/images/work/hollow-coast-work-1.svg"],
    coverImage: "/images/work/hollow-coast-work.svg",
    year: 2024,
    tags: ["Asset Pack", "2D Art", "Pipeline"],
    links: [{ label: "View product", href: "/products/hollow-coast-kit" }],
    featured: false,
  },
];
