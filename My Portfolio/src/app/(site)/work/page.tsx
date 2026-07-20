import type { Metadata } from "next";
import { ProjectCard } from "@/components/work/project-card";
import { SectionHeader } from "@/components/sections/section-header";
import { FadeIn } from "@/components/motion/fade-in";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects by James Raphael Ibay — games, software, art, and client slices.",
};

export default function WorkPage() {
  const projects = getProjects();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
      <SectionHeader
        eyebrow="My Portfolio"
        title="Selected work."
        description="A mix of shipped products and client engagements. Each case focuses on what I owned and what was delivered."
      />
      <div className="grid gap-12 md:grid-cols-2">
        {projects.map((project, i) => (
          <FadeIn key={project.slug} delay={i * 0.05}>
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
