import { notFound } from "next/navigation";
import {
  ProjectEditor,
  type ProjectFormValues,
} from "@/components/admin/project-editor";
import { mapProject } from "@/lib/content/mappers";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";

type Props = { params: Promise<{ id: string }> };

export const metadata = {
  title: "Edit project — Tagapangasiwa",
  robots: { index: false, follow: false },
};

export default async function EditProjectPage({ params }: Props) {
  if (!isDatabaseConfigured()) notFound();
  const { id } = await params;
  const row = await prisma.project.findUnique({ where: { id } });
  if (!row) notFound();
  const project = mapProject(row);
  const initial: ProjectFormValues = {
    slug: project.slug,
    title: project.title,
    role: project.role,
    summary: project.summary,
    description: project.description,
    outcomesText: project.outcomes.join("\n"),
    images: project.images,
    coverImage: project.coverImage,
    year: project.year,
    tagsText: project.tags.join(", "),
    links: project.links,
    featured: project.featured,
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl text-foreground">Edit project</h1>
      <ProjectEditor projectId={row.id} initial={initial} />
    </div>
  );
}
