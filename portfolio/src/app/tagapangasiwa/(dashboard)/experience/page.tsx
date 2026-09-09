import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ExperienceEditor,
  type ExperienceFormValues,
} from "@/components/admin/experience-editor";
import { mapExperience } from "@/lib/content/mappers";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";

export const metadata = {
  title: "Experience — Tagapangasiwa",
  robots: { index: false, follow: false },
};

export default async function AdminExperiencePage() {
  const rows = isDatabaseConfigured()
    ? await prisma.experienceEntry.findMany({ orderBy: { sortOrder: "asc" } })
    : [];

  const blank: ExperienceFormValues = {
    id: "",
    org: "",
    role: "",
    period: "",
    summary: "",
  };

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-4xl text-foreground">Experience</h1>
        <p className="mt-3 text-sm text-foreground-muted">
          Timeline entries on the About page.
        </p>
      </div>

      <ul className="divide-y divide-border border-t border-border">
        {rows.map((row) => {
          const item = mapExperience(row);
          return (
            <li key={row.id} className="space-y-6 py-8">
              <div>
                <p className="text-lg text-foreground">
                  {item.role} · {item.org}
                </p>
                <p className="text-xs text-foreground-subtle">
                  {item.id} · {item.period}
                </p>
              </div>
              <ExperienceEditor mode="edit" initial={item} />
            </li>
          );
        })}
      </ul>

      <section className="space-y-4 border-t border-border pt-10">
        <h2 className="font-display text-2xl text-foreground">Add entry</h2>
        <ExperienceEditor mode="create" initial={blank} />
      </section>

      {rows.length === 0 ? (
        <p className="text-sm text-foreground-muted">
          No experience entries yet. Seed the database or create one above.
        </p>
      ) : null}

      <Button asChild variant="secondary">
        <Link href="/about" target="_blank">
          Preview About page
        </Link>
      </Button>
    </div>
  );
}
