import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ServiceEditor,
  type ServiceFormValues,
} from "@/components/admin/service-editor";
import { mapService } from "@/lib/content/mappers";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";

export const metadata = {
  title: "Services — Tagapangasiwa",
  robots: { index: false, follow: false },
};

export default async function AdminServicesPage() {
  const rows = isDatabaseConfigured()
    ? await prisma.service.findMany({ orderBy: { sortOrder: "asc" } })
    : [];

  const blank: ServiceFormValues = {
    id: "",
    title: "",
    description: "",
    deliverablesText: "",
    idealFor: "",
  };

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-4xl text-foreground">Services</h1>
        <p className="mt-3 text-sm text-foreground-muted">
          Offerings listed on the Services page and homepage.
        </p>
      </div>

      <ul className="divide-y divide-border border-t border-border">
        {rows.map((row) => {
          const service = mapService(row);
          return (
            <li key={row.id} className="space-y-6 py-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-lg text-foreground">{service.title}</p>
                  <p className="text-xs text-foreground-subtle">{service.id}</p>
                </div>
              </div>
              <ServiceEditor
                mode="edit"
                initial={{
                  id: service.id,
                  title: service.title,
                  description: service.description,
                  deliverablesText: service.deliverables.join("\n"),
                  idealFor: service.idealFor,
                }}
              />
            </li>
          );
        })}
      </ul>

      <section className="space-y-4 border-t border-border pt-10">
        <h2 className="font-display text-2xl text-foreground">Add service</h2>
        <ServiceEditor mode="create" initial={blank} />
      </section>

      {rows.length === 0 ? (
        <p className="text-sm text-foreground-muted">
          No services yet. Seed the database or create one above.
        </p>
      ) : null}

      <Button asChild variant="secondary">
        <Link href="/services" target="_blank">
          Preview public services
        </Link>
      </Button>
    </div>
  );
}
