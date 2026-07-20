import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { SectionHeader } from "@/components/sections/section-header";
import { getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact James Raphael Ibay for general inquiries.",
};

export default function ContactPage() {
  const site = getSite();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <SectionHeader
            eyebrow="Contact"
            title="Get in touch."
            description="For commissions with a brief and budget, use the commissions form — it is faster to evaluate. For everything else, write here."
          />
          <div className="space-y-4 text-sm text-foreground-muted">
            <p>
              Email:{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-accent hover:text-accent-hover"
              >
                {site.email}
              </a>
            </p>
            <p>{site.location}</p>
            <p>
              <Link
                href="/commissions"
                className="text-accent hover:text-accent-hover"
              >
                Prefer a commission inquiry →
              </Link>
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
