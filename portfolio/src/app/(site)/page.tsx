import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { SectionHeader } from "@/components/sections/section-header";
import { CtaBand } from "@/components/sections/cta-band";
import { Timeline } from "@/components/sections/timeline";
import { ProjectCard } from "@/components/work/project-card";
import { FadeIn } from "@/components/motion/fade-in";
import {
  getFeaturedProjects,
  getServices,
  getSite,
  getWorkingWithMe,
} from "@/lib/content";

export default async function HomePage() {
  const site = await getSite();
  const featuredProjects = (await getFeaturedProjects()).slice(0, 3);
  const services = (await getServices()).slice(0, 3);
  const workingWithMe = await getWorkingWithMe();
  const itchSocial = site.socials.find((s) => s.label === "itch.io");

  return (
    <>
      <Hero
        brandName={site.brandName}
        screenName={site.screenName}
        headline={site.hero.headline}
        supporting={site.hero.supporting}
        primaryCta={site.hero.primaryCta}
        secondaryCta={site.hero.secondaryCta}
        portraitImage={site.portraitImage}
        backgroundVideoUrl={site.hero.backgroundVideoUrl}
        reelYoutubeUrl={site.hero.reelYoutubeUrl}
      />

      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-28">
        <SectionHeader
          eyebrow="My Portfolio"
          title="Selected work."
          description="Productions where I owned design, art, engineering — or a defined slice of client work."
          href="/work"
          linkLabel="View all work"
        />
        <div className="grid gap-12 lg:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <FadeIn key={project.slug} delay={i * 0.06}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </section>

      {itchSocial ? (
        <CtaBand
          title="Also on itch.io"
          description="Free games, tools, and art packs you can download anytime — separate from commissions."
          primary={{ label: "Visit itch.io", href: itchSocial.href }}
          secondary={{ label: "Browse work", href: "/work" }}
        />
      ) : null}

      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-28">
        <SectionHeader
          eyebrow="Working With Me"
          title="How I keep projects reliable."
          description="Clear scope, visible milestones, and production habits that survive handoff."
        />
        <Timeline items={workingWithMe} variant="process" />
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-28">
          <SectionHeader
            eyebrow="My Services"
            title="What I create for clients."
            description="Custom games, game art, software tools, and focused production support."
            href="/services"
            linkLabel="See all services"
          />
          <div className="grid gap-10 md:grid-cols-3">
            {services.map((service, i) => (
              <FadeIn key={service.id} delay={i * 0.06}>
                <article className="space-y-3 border-t border-border pt-6">
                  <h3 className="text-xl text-foreground">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-foreground-muted">
                    {service.description}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to work together?"
        description="Tell me what you need. I will reply with fit, questions, and a clear path to scope — before any payment."
        primary={{ label: "Start a commission", href: "/commissions" }}
        secondary={{ label: "Contact me", href: "/contact" }}
      />

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <p className="text-sm text-foreground-subtle">
          Looking for my story and experience?{" "}
          <Link href="/about" className="text-accent hover:text-accent-hover">
            Read About
          </Link>
          .
        </p>
      </section>
    </>
  );
}
