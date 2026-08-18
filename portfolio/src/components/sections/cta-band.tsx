import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";

type CtaLink = { label: string; href: string };

type CtaBandProps = {
  title: string;
  description: string;
  primary: CtaLink;
  secondary?: CtaLink;
};

function isExternal(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function CtaButton({
  link,
  variant = "default",
}: {
  link: CtaLink;
  variant?: "default" | "secondary";
}) {
  const external = isExternal(link.href);
  return (
    <Button asChild size="lg" variant={variant === "secondary" ? "secondary" : "default"}>
      {external ? (
        <a href={link.href} target="_blank" rel="noopener noreferrer">
          {link.label}
        </a>
      ) : (
        <Link href={link.href}>{link.label}</Link>
      )}
    </Button>
  );
}

export function CtaBand({ title, description, primary, secondary }: CtaBandProps) {
  return (
    <section className="border-y border-border bg-background-elevated">
      <FadeIn className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground-muted">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <CtaButton link={primary} />
            {secondary ? <CtaButton link={secondary} variant="secondary" /> : null}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
