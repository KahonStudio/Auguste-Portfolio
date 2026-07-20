import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types";
import { RevealImage } from "@/components/motion/reveal-image";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <RevealImage className="overflow-hidden border border-border bg-background-muted">
        <div className="relative aspect-[16/10]">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </RevealImage>
      <div className="mt-4 space-y-2">
        <p className="text-xs uppercase tracking-[0.16em] text-foreground-subtle">
          {project.year} · {project.role}
        </p>
        <h3 className="text-xl text-foreground transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-foreground-muted">
          {project.summary}
        </p>
      </div>
    </Link>
  );
}
