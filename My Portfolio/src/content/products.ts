import type { Product } from "@/types";

export const products: Product[] = [
  {
    slug: "ember-reach",
    title: "Ember Reach",
    kind: "game",
    tagline: "A compact action adventure with handcrafted environments.",
    description:
      "Explore a burning frontier in a focused adventure built with original art, combat, and exploration systems.",
    longDescription:
      "Ember Reach is a compact action adventure I designed, illustrated, and programmed. It features handcrafted environments, a tight combat loop, and a short campaign meant to feel complete — not like a demo that stops mid-sentence.\n\nBuilt for players who want a finished experience with strong visual identity, and for developers who want to study a focused production scope.",
    priceLabel: "$7.99",
    itchUrl: "https://auguste.itch.io",
    coverImage: "/images/products/ember-reach.svg",
    gallery: [
      "/images/products/ember-reach-1.svg",
      "/images/products/ember-reach-2.svg",
      "/images/products/ember-reach-3.svg",
    ],
    tags: ["Action", "Adventure", "Original Art"],
    engine: "Unity",
    platforms: ["Windows", "macOS"],
    featured: true,
    status: "available",
    licenseNote: "Personal and commercial play. Redistribution of source assets requires a separate license.",
  },
  {
    slug: "signal-desk",
    title: "Signal Desk",
    kind: "software",
    tagline: "A lightweight project desk for solo and small-team game production.",
    description:
      "Track milestones, builds, and art tasks in one calm workspace designed for indie production.",
    longDescription:
      "Signal Desk is software I built for managing small game productions without enterprise overhead. It keeps milestones, build notes, and art queues in one place so you can stay oriented without fighting the tool.\n\nDesigned for solo developers and tiny teams who need clarity more than ceremony.",
    priceLabel: "$14.99",
    itchUrl: "https://auguste.itch.io",
    coverImage: "/images/products/signal-desk.svg",
    gallery: [
      "/images/products/signal-desk-1.svg",
      "/images/products/signal-desk-2.svg",
    ],
    tags: ["Productivity", "Indie Tools", "Desktop"],
    platforms: ["Windows", "macOS"],
    featured: true,
    status: "available",
    licenseNote: "Single-seat license. Team licensing available on request.",
  },
  {
    slug: "night-market",
    title: "Night Market",
    kind: "game",
    tagline: "A narrative market sim with painted characters and quiet stakes.",
    description:
      "Run a night stall, meet regulars, and shape a small story through trade and timing.",
    longDescription:
      "Night Market is a narrative simulation game with original character art and a soft systems loop. You manage a stall, learn the rhythms of regulars, and make choices that shift the tone of each night.\n\nI handled design, art direction, and implementation end to end.",
    priceLabel: "$5.99",
    itchUrl: "https://auguste.itch.io",
    coverImage: "/images/products/night-market.svg",
    gallery: [
      "/images/products/night-market-1.svg",
      "/images/products/night-market-2.svg",
    ],
    tags: ["Narrative", "Simulation", "Original Art"],
    engine: "Godot",
    platforms: ["Windows", "Linux"],
    featured: true,
    status: "available",
  },
  {
    slug: "frame-ledger",
    title: "Frame Ledger",
    kind: "software",
    tagline: "Animation and sprite sheet review for artists and programmers.",
    description:
      "Inspect frame timing, export notes, and share review builds with clear visual feedback.",
    longDescription:
      "Frame Ledger helps artists and engineers review sprite sheets and animation timing without bouncing between tools. Load sheets, scrub frames, annotate timing issues, and export review notes for your pipeline.\n\nBuilt from friction I kept hitting in my own art-to-engine workflow.",
    priceLabel: "$9.99",
    itchUrl: "https://auguste.itch.io",
    coverImage: "/images/products/frame-ledger.svg",
    gallery: ["/images/products/frame-ledger-1.svg"],
    tags: ["Art Tools", "Animation", "Workflow"],
    platforms: ["Windows"],
    featured: false,
    status: "available",
  },
  {
    slug: "hollow-coast-kit",
    title: "Hollow Coast Kit",
    kind: "asset-pack",
    tagline: "Environment tiles and props from a coastal ruin setting.",
    description:
      "A cohesive set of tiles, props, and lighting references for 2D coastal ruin scenes.",
    longDescription:
      "Hollow Coast Kit packages environment art I created for a coastal ruin setting — tiles, props, and lighting references organized for direct use in 2D projects.\n\nIncludes usage notes and suggested layering for consistent scenes.",
    priceLabel: "$12.00",
    itchUrl: "https://auguste.itch.io",
    coverImage: "/images/products/hollow-coast.svg",
    gallery: [
      "/images/products/hollow-coast-1.svg",
      "/images/products/hollow-coast-2.svg",
    ],
    tags: ["2D Art", "Environments", "Tiles"],
    featured: true,
    status: "available",
    licenseNote: "Royalty-free for games and interactive media. Credit appreciated, not required.",
  },
  {
    slug: "orbit-brief",
    title: "Orbit Brief",
    kind: "software",
    tagline: "A coming tool for scoped pitch and vertical slice planning.",
    description:
      "Structure pitches, slice goals, and risk notes before production expands.",
    longDescription:
      "Orbit Brief is in development — a planning tool for turning vague game ideas into scoped pitches and vertical slice goals. Early access details will appear on itch.io when ready.",
    priceLabel: "Coming soon",
    itchUrl: "https://auguste.itch.io",
    coverImage: "/images/products/orbit-brief.svg",
    gallery: [],
    tags: ["Planning", "Production"],
    featured: false,
    status: "coming-soon",
  },
];
