"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/tagapangasiwa", label: "Overview", exact: true },
  { href: "/tagapangasiwa/site", label: "Site & Hero" },
  { href: "/tagapangasiwa/projects", label: "Projects" },
  { href: "/tagapangasiwa/services", label: "Services" },
  { href: "/tagapangasiwa/media", label: "Media" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border bg-background-elevated">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent">
            Tagapangasiwa
          </p>
          <p className="font-display text-xl text-foreground">Content desk</p>
        </div>
        <nav className="flex flex-wrap items-center gap-1">
          {links.map((link) => {
            const active = link.exact
              ? pathname === link.href
              : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm transition-colors",
                  active
                    ? "text-accent"
                    : "text-foreground-muted hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="ml-2"
            onClick={() => signOut({ callbackUrl: "/tagapangasiwa/login" })}
          >
            Sign out
          </Button>
        </nav>
      </div>
    </header>
  );
}
