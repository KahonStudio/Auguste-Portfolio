import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "custom-games",
    title: "Custom Games",
    description:
      "I design and build focused game experiences — prototypes, vertical slices, or small finished titles — with systems and art aligned from the start.",
    deliverables: [
      "Scoped design document and milestone plan",
      "Playable builds at agreed checkpoints",
      "Original art direction or integration of provided assets",
      "Handoff notes for continued development if needed",
    ],
    idealFor: "Indie teams and studios needing a clear, shippable slice or small title.",
  },
  {
    id: "game-art",
    title: "Game Art & Visual Direction",
    description:
      "I create environments, characters, UI, and visual systems that hold together in-engine — not just portfolio stills.",
    deliverables: [
      "Style frames and production-ready assets",
      "Tile sets, props, or character sheets as scoped",
      "Export settings matched to your engine",
      "Usage notes for consistent scene assembly",
    ],
    idealFor: "Projects that need cohesive art with technical awareness.",
  },
  {
    id: "software-tools",
    title: "Software & Tools",
    description:
      "I build desktop and workflow software for creators and developers — calm interfaces, practical features, and clear ownership.",
    deliverables: [
      "Requirements and interaction design",
      "Working software against agreed platforms",
      "Documentation for users and maintainers",
      "Optional packaging for distribution (for example itch.io)",
    ],
    idealFor: "Teams that need custom tooling without enterprise bloat.",
  },
  {
    id: "production-support",
    title: "Production Support",
    description:
      "I help organize scope, milestones, and review builds so small teams stay oriented through a critical phase of production.",
    deliverables: [
      "Scope and risk review",
      "Milestone and slice planning",
      "Build and review process recommendations",
      "Hands-on implementation support as agreed",
    ],
    idealFor: "Studios preparing pitches, slices, or a focused shipping window.",
  },
];
