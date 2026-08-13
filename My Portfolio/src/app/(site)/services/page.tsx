import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/sections/section-header";
import { CtaBand } from "@/components/sections/cta-band";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { getServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom games, game art, software tools, and production support by James Raphael Ibay.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
        <SectionHeader
          eyebrow="My Services"
          title="What I offer."
          description="I take on focused work across games, art, and software. Every engagement starts with a written scope."
        />

        <div className="space-y-16">
          {services.map((service, i) => (
            <FadeIn key={service.id} delay={i * 0.04}>
              <article className="grid gap-8 border-t border-border pt-10 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="space-y-3">
                  <h2 className="font-display text-3xl text-foreground">
                    {service.title}
                  </h2>
                  <p className="text-sm text-foreground-subtle">
                    Ideal for: {service.idealFor}
                  </p>
                </div>
                <div className="space-y-6">
                  <p className="text-base leading-relaxed text-foreground-muted">
                    {service.description}
                  </p>
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-foreground-subtle">
                      Deliverables
                    </p>
                    <ul className="mt-3 space-y-2">
                      {service.deliverables.map((item) => (
                        <li
                          key={item}
                          className="text-sm leading-relaxed text-foreground-muted"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <div className="mt-16">
          <Button asChild size="lg">
            <Link href="/commissions">Discuss a commission</Link>
          </Button>
        </div>
      </div>

      <CtaBand
        title="Want to try something I already shipped?"
        description="Free games, tools, and art packs are on my itch.io page — separate from custom commissions."
        primary={{ label: "Visit itch.io", href: "https://auguste.itch.io" }}
        secondary={{ label: "View work", href: "/work" }}
      />
    </>
  );
}
