import type { FaqItem, ProcessStep } from "@/types";

export const commissionProcess: ProcessStep[] = [
  {
    id: "inquiry",
    title: "Inquiry",
    description:
      "You send a brief: what you need, timeline, budget range, and references. I reply with whether I am a fit and any clarifying questions.",
  },
  {
    id: "scope",
    title: "Scope & Quote",
    description:
      "We agree on deliverables, milestones, revision rounds, and a fixed or phased quote. Nothing starts until the scope is written down.",
  },
  {
    id: "deposit",
    title: "Deposit & Kickoff",
    description:
      "A deposit confirms the schedule. Payment methods are agreed during scoping — typically invoice or platform payment after terms are clear.",
  },
  {
    id: "production",
    title: "Production & Reviews",
    description:
      "I work in milestones with review builds or art drops. Feedback stays inside the agreed revision rounds so the schedule remains honest.",
  },
  {
    id: "delivery",
    title: "Delivery & Balance",
    description:
      "Final files, source where contracted, and handoff notes are delivered. The remaining balance is due on acceptance of the final milestone.",
  },
];

export const commissionFaqs: FaqItem[] = [
  {
    id: "payment",
    question: "How do clients pay me?",
    answer:
      "Payment terms are set during scoping. Typical structure is a deposit to reserve the schedule and a balance on final delivery. I invoice clearly and can work with standard methods once the agreement is in place. Digital products are purchased separately on itch.io.",
  },
  {
    id: "timeline",
    question: "How long do commissions take?",
    answer:
      "It depends on scope. Small art or tooling passes may take days to a few weeks. Game slices and larger builds are scheduled in milestones. I will not commit to a date I cannot defend.",
  },
  {
    id: "revisions",
    question: "How are revisions handled?",
    answer:
      "Revision rounds are defined in the scope. Feedback should be consolidated per round. Material scope changes are requoted rather than absorbed silently.",
  },
  {
    id: "ownership",
    question: "Who owns the work?",
    answer:
      "Ownership and license terms are written into the agreement before work begins. Product purchases on itch.io follow each product’s license notes.",
  },
  {
    id: "fit",
    question: "What kind of work do you take?",
    answer:
      "Games, original game art, software tools, and focused production support. I prefer clear scopes over vague retainers. If I am not the right fit, I will say so early.",
  },
];

export const workingWithMe: ProcessStep[] = [
  {
    id: "clear-scope",
    title: "Clear scope",
    description:
      "I write down deliverables, milestones, and what is out of scope before production starts.",
  },
  {
    id: "visible-progress",
    title: "Visible progress",
    description:
      "You get review builds or art drops at milestones — not silence until the deadline.",
  },
  {
    id: "production-habits",
    title: "Production habits",
    description:
      "I organize files, name things consistently, and leave notes you can continue from.",
  },
];
