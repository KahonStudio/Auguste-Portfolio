import Link from "next/link";
import { isCloudinaryConfigured } from "@/lib/cloudinary";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";

export const metadata = {
  title: "Tagapangasiwa",
  robots: { index: false, follow: false },
};

export default async function AdminHomePage() {
  const db = isDatabaseConfigured();
  let projectCount = 0;
  let serviceCount = 0;
  let mediaCount = 0;
  if (db) {
    try {
      [projectCount, serviceCount, mediaCount] = await Promise.all([
        prisma.project.count(),
        prisma.service.count(),
        prisma.mediaAsset.count(),
      ]);
    } catch {
      /* empty until migrate/seed */
    }
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-4xl text-foreground">Overview</h1>
        <p className="mt-3 max-w-2xl text-sm text-foreground-muted">
          Edit live site content without redeploying. Changes go to the database;
          the public site reads through content accessors.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Projects" value={String(projectCount)} />
        <Stat label="Services" value={String(serviceCount)} />
        <Stat label="Media assets" value={String(mediaCount)} />
      </div>

      <div className="space-y-3 border-t border-border pt-8">
        <h2 className="font-display text-2xl text-foreground">Status</h2>
        <ul className="space-y-2 text-sm text-foreground-muted">
          <li>Database: {db ? "configured" : "missing DATABASE_URL (using static fallback on public site)"}</li>
          <li>
            Cloudinary:{" "}
            {isCloudinaryConfigured()
              ? "credentials present — if uploads 403, use the main full-access API key (not a restricted key)"
              : "not ready — check API secret (must not equal API key)"}
          </li>
        </ul>
      </div>

      <div className="space-y-3 border-t border-border pt-8">
        <h2 className="font-display text-2xl text-foreground">Quick links</h2>
        <ul className="space-y-2 text-sm">
          <li>
            <Link className="text-accent hover:text-accent-hover" href="/tagapangasiwa/site">
              Edit Site & Hero
            </Link>
          </li>
          <li>
            <Link className="text-accent hover:text-accent-hover" href="/tagapangasiwa/projects">
              Manage Projects
            </Link>
          </li>
          <li>
            <Link className="text-accent hover:text-accent-hover" href="/tagapangasiwa/services">
              Manage Services
            </Link>
          </li>
          <li>
            <Link className="text-accent hover:text-accent-hover" href="/tagapangasiwa/media">
              Media library
            </Link>
          </li>
          <li>
            <Link className="text-accent hover:text-accent-hover" href="/" target="_blank">
              View public site
            </Link>
          </li>
        </ul>
      </div>

      <div className="space-y-3 border-t border-border pt-8">
        <h2 className="font-display text-2xl text-foreground">Phase 3 TODO</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-foreground-subtle">
          <li>Experience timeline editor</li>
          <li>Commission process / FAQs editor</li>
          <li>Legal pages editor</li>
          <li>Nav / socials structured editor (partially via Site JSON today)</li>
        </ul>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border bg-background-elevated p-5">
      <p className="text-xs uppercase tracking-[0.16em] text-foreground-subtle">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl text-foreground">{value}</p>
    </div>
  );
}
