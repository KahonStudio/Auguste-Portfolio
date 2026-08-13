import { SiteEditor } from "@/components/admin/site-editor";
import { getSite } from "@/lib/content";
import { isDatabaseConfigured } from "@/lib/prisma";

export const metadata = {
  title: "Site & Hero — Tagapangasiwa",
  robots: { index: false, follow: false },
};

export default async function AdminSitePage() {
  const site = await getSite();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl text-foreground">Site & Hero</h1>
        <p className="mt-3 text-sm text-foreground-muted">
          Brand identity, hero CTAs, portrait, background video, and about copy.
        </p>
      </div>
      {!isDatabaseConfigured() ? (
        <p className="text-sm text-danger">
          DATABASE_URL is not set. Public site uses static files; saves will fail until you configure and seed the DB.
        </p>
      ) : null}
      <SiteEditor initial={site} />
    </div>
  );
}
