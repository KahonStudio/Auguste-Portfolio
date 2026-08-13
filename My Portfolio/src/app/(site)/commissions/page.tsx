import type { Metadata } from "next";
import { CommissionForm } from "@/components/forms/commission-form";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { SectionHeader } from "@/components/sections/section-header";
import { Timeline } from "@/components/sections/timeline";
import {
  getCommissionFaqs,
  getCommissionProcess,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Commissions",
  description:
    "How commissions work with James Raphael Ibay — process, payment posture, and inquiry form.",
};

export default async function CommissionsPage() {
  const process = await getCommissionProcess();
  const faqs = await getCommissionFaqs();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
      <SectionHeader
        eyebrow="Working With Me"
        title="Commissions."
        description="I take select custom work for games, art, and software. Expect clear scope, milestone reviews, and payment terms agreed before production starts."
      />

      <div className="grid gap-20 lg:grid-cols-2">
        <div>
          <h2 className="mb-8 font-display text-2xl text-foreground">
            My Process
          </h2>
          <Timeline items={process} variant="process" />
        </div>

        <div>
          <h2 className="mb-8 font-display text-2xl text-foreground">
            Commission inquiry
          </h2>
          <CommissionForm />
        </div>
      </div>

      <section className="mt-24 max-w-3xl">
        <h2 className="mb-6 font-display text-2xl text-foreground">
          Common questions
        </h2>
        <FaqAccordion items={faqs} />
      </section>
    </div>
  );
}
