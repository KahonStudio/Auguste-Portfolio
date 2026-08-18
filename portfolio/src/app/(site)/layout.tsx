import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getSite } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSite();

  return (
    <>
      <SiteHeader
        brandName={site.brandName}
        screenName={site.screenName}
        nav={site.nav}
      />
      <main className="min-h-screen">{children}</main>
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
