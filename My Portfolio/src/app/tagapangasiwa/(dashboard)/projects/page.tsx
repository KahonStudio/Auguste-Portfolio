import Link from "next/link";
import { Button } from "@/components/ui/button";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { mapProject } from "@/lib/content/mappers";

export const metadata = {
  title: "Projects — Tagapangasiwa",
  robots: { index: false, follow: false },
};

export default async function AdminProjectsPage() {
  const rows = isDatabaseConfigured()
    ? await prisma.project.findMany({ orderBy: { sortOrder: "asc" } })
    : [];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-foreground">Projects</h1>
          <p className="mt-3 text-sm text-foreground-muted">
            Case studies shown on Work and the homepage.
          </p>
        </div>
        <Button asChild>
          <Link href="/tagapangasiwa/projects/new">New project</Link>
        </Button>
      </div>

      <ul className="divide-y divide-border border-t border-border">
        {rows.map((row) => {
          const project = mapProject(row);
          return (
            <li key={row.id} className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="text-foreground">{project.title}</p>
                <p className="text-xs text-foreground-subtle">
                  /work/{project.slug}
                  {project.featured ? " · featured" : ""}
                </p>
              </div>
              <Button asChild variant="secondary" size="sm">
                <Link href={`/tagapangasiwa/projects/${row.id}`}>Edit</Link>
              </Button>
            </li>
          );
        })}
      </ul>
      {rows.length === 0 ? (
        <p className="text-sm text-foreground-muted">
          No projects in the database. Run <code>npm run db:seed</code> after migrate.
        </p>
      ) : null}
    </div>
  );
}
