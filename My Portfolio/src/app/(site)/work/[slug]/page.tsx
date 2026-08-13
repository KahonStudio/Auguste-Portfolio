import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RevealImage } from "@/components/motion/reveal-image";
import { Button } from "@/components/ui/button";
import { getProjectBySlug, getProjectSlugs } from "@/lib/content";
import { isVideoUrl } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Work" };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const galleryVideos = project.images.filter(isVideoUrl);
  const galleryImages = project.images.filter((src) => !isVideoUrl(src));

  return (
    <article className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
      <header className="max-w-3xl space-y-4">
        <p className="text-xs uppercase tracking-[0.2em] text-foreground-subtle">
          {project.year} · {project.role}
        </p>
        <h1 className="font-display text-4xl tracking-tight text-foreground sm:text-5xl">
          {project.title}
        </h1>
        <p className="text-lg text-foreground-muted">{project.summary}</p>
      </header>

      <RevealImage className="relative mt-12 aspect-[21/9] overflow-hidden border border-border bg-background-muted">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </RevealImage>

      <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_0.7fr]">
        <div className="space-y-5 text-base leading-relaxed text-foreground-muted">
          {project.description.split("\n\n").map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>

        <aside className="space-y-8 lg:border-l lg:border-border lg:pl-10">
          <div>
            <h2 className="text-xs uppercase tracking-[0.16em] text-foreground-subtle">
              Outcomes
            </h2>
            <ul className="mt-4 space-y-3">
              {project.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="text-sm leading-relaxed text-foreground-muted"
                >
                  {outcome}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-[0.16em] text-foreground-subtle">
              Tags
            </h2>
            <p className="mt-3 text-sm text-foreground-muted">
              {project.tags.join(" · ")}
            </p>
          </div>

          {project.links.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {project.links.map((link) => (
                <Button key={link.href} asChild variant="secondary" size="sm">
                  <Link
                    href={link.href}
                    {...(link.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </Link>
                </Button>
              ))}
            </div>
          ) : null}
        </aside>
      </div>

      {project.images.length > 0 ? (
        <div className="mt-16 space-y-6">
          {galleryVideos.map((src) => (
            <div
              key={src}
              className="overflow-hidden border border-border bg-background-muted"
            >
              <video
                src={src}
                className="aspect-video w-full object-cover"
                controls
                playsInline
                preload="metadata"
              />
            </div>
          ))}
          {galleryImages.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {galleryImages.map((src) => (
                <RevealImage
                  key={src}
                  className="relative aspect-[16/10] overflow-hidden border border-border bg-background-muted"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </RevealImage>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
