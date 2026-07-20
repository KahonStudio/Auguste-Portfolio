import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/sections/section-header";
import { Timeline } from "@/components/sections/timeline";
import { CtaBand } from "@/components/sections/cta-band";
import { RevealImage } from "@/components/motion/reveal-image";
import { Button } from "@/components/ui/button";
import { getExperience, getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who Auguste (James Raphael Ibay) is — developer and artist building games and software.",
};

export default function AboutPage() {
  const site = getSite();
  const experience = getExperience();

  return (
    <>
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
          <RevealImage className="relative aspect-[4/5] overflow-hidden border border-border bg-background-muted lg:sticky lg:top-24">
            <Image
              src={site.portraitImage}
              alt={`${site.brandName}, also known as ${site.screenName}`}
              fill
              className="object-cover object-[center_15%]"
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
            />
          </RevealImage>

          <div>
            <SectionHeader
              eyebrow="My Story"
              title={site.about.headline}
              description={site.about.paragraphs[0]}
            />

            <div className="max-w-3xl space-y-5 text-base leading-relaxed text-foreground-muted">
              {site.about.paragraphs.slice(1).map((para) => (
                <p key={para.slice(0, 32)}>{para}</p>
              ))}
            </div>

            <p className="mt-8 text-sm tracking-wide text-foreground-subtle">
              {site.brandName}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/work">View my work</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/commissions">Commission work</Link>
              </Button>
            </div>
          </div>
        </div>

        <section className="mt-24">
          <h2 className="mb-10 font-display text-3xl text-foreground">
            Experience
          </h2>
          <Timeline items={experience} variant="experience" />
        </section>

        <section className="mt-24 max-w-2xl space-y-4 border-t border-border pt-12">
          <h2 className="font-display text-2xl text-foreground">
            Why clients trust the process
          </h2>
          <p className="text-sm leading-relaxed text-foreground-muted">
            I write scopes down. I show progress at milestones. I separate
            product purchases (itch.io) from commission payment (agreed after
            scope). Legal pages cover terms, privacy, and licenses so
            expectations are visible before we start.
          </p>
          <p className="text-sm text-foreground-muted">
            Based: {site.location}. Reach me at{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-accent hover:text-accent-hover"
            >
              {site.email}
            </a>
            .
          </p>
        </section>
      </div>

      <CtaBand
        title="Let’s talk about your project."
        description="Send a commission inquiry with your brief and budget range."
        primary={{ label: "Open commissions", href: "/commissions" }}
        secondary={{ label: "General contact", href: "/contact" }}
      />
    </>
  );
}
