import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { getSite } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function NotFound() {
  const site = await getSite();

  return (
    <>
      <SiteHeader
        brandName={site.brandName}
        screenName={site.screenName}
        nav={site.nav}
      />
      <main className="min-h-screen">
        <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-start justify-center px-6 py-24 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-foreground-subtle">
            404
          </p>
          <h1 className="mt-4 font-display text-4xl text-foreground">
            Page not found
          </h1>
          <p className="mt-4 max-w-md text-sm text-foreground-muted">
            That route does not exist. Head back home or browse selected work.
          </p>
          <div className="mt-8 flex gap-4">
            <Button asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/work">Work</Link>
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter
        brandName={site.brandName}
        screenName={site.screenName}
        email={site.email}
        footerNav={site.footerNav}
        socials={site.socials}
      />
    </>
  );
}
