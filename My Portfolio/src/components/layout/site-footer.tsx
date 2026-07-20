import Link from "next/link";
import type { NavItem, SocialLink } from "@/types";

type SiteFooterProps = {
  brandName: string;
  screenName: string;
  email: string;
  footerNav: NavItem[];
  socials: SocialLink[];
};

export function SiteFooter({
  brandName,
  screenName,
  email,
  footerNav,
  socials,
}: SiteFooterProps) {
  const year = new Date().getFullYear();
  const primary = footerNav.filter((i) => !i.href.startsWith("/legal"));
  const legal = footerNav.filter((i) => i.href.startsWith("/legal"));

  return (
    <footer className="border-t border-border bg-background-elevated">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-3 lg:px-8">
        <div className="space-y-4">
          <p className="font-display text-xl text-foreground">{brandName}</p>
          <p className="text-xs uppercase tracking-[0.2em] text-accent">
            {screenName}
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-foreground-muted">
            Games and software with original craft. Products on itch.io as{" "}
            {screenName}. Commissions by inquiry.
          </p>
          <a
            href={`mailto:${email}`}
            className="inline-block text-sm text-accent hover:text-accent-hover"
          >
            {email}
          </a>
        </div>

        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-foreground-subtle">
            Navigate
          </p>
          <ul className="space-y-2">
            {primary.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-foreground-muted hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-8">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-foreground-subtle">
              Elsewhere
            </p>
            <ul className="space-y-2">
              {socials.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground-muted hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-foreground-subtle">
              Legal
            </p>
            <ul className="space-y-2">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground-muted hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-foreground-subtle sm:flex-row sm:justify-between lg:px-8">
          <p>
            © {year} {brandName}. All rights reserved.
          </p>
          <p>Built as a personal brand — first person, production focused.</p>
        </div>
      </div>
    </footer>
  );
}
