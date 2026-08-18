import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegalPageBySlug, getLegalSlugs } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getLegalSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLegalPageBySlug(slug);
  if (!page) return { title: "Legal" };
  return {
    title: page.title,
    description: `${page.title} for James Raphael Ibay.`,
  };
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params;
  const page = await getLegalPageBySlug(slug);
  if (!page) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-24">
      <p className="text-xs uppercase tracking-[0.2em] text-foreground-subtle">
        Legal · Updated {page.updatedAt}
      </p>
      <h1 className="mt-4 font-display text-4xl tracking-tight text-foreground">
        {page.title}
      </h1>
      <div className="mt-12 space-y-10">
        {page.sections.map((section) => (
          <section key={section.heading} className="space-y-3">
            <h2 className="text-xl text-foreground">{section.heading}</h2>
            <p className="text-sm leading-relaxed text-foreground-muted">
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
