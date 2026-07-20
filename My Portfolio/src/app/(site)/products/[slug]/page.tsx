import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyButton } from "@/components/products/buy-button";
import { ProductGallery } from "@/components/products/product-gallery";
import { Button } from "@/components/ui/button";
import { getProductBySlug, getProductSlugs } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const kindLabel =
    product.kind === "asset-pack"
      ? "Asset Pack"
      : product.kind === "game"
        ? "Game"
        : "Software";

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <ProductGallery
          title={product.title}
          coverImage={product.coverImage}
          gallery={product.gallery}
        />

        <div className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-foreground-subtle">
              {kindLabel}
              {product.engine ? ` · ${product.engine}` : null}
            </p>
            <h1 className="font-display text-4xl tracking-tight text-foreground sm:text-5xl">
              {product.title}
            </h1>
            <p className="text-lg text-foreground-muted">{product.tagline}</p>
            <p className="text-2xl text-accent">{product.priceLabel}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <BuyButton itchUrl={product.itchUrl} status={product.status} />
            <Button asChild variant="secondary" size="lg">
              <Link href="/contact">Questions?</Link>
            </Button>
          </div>

          <div className="space-y-4 border-t border-border pt-8 text-sm leading-relaxed text-foreground-muted">
            {product.longDescription.split("\n\n").map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>

          {product.platforms?.length ? (
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-foreground-subtle">
                Platforms
              </p>
              <p className="mt-2 text-sm text-foreground-muted">
                {product.platforms.join(" · ")}
              </p>
            </div>
          ) : null}

          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-foreground-subtle">
              Tags
            </p>
            <p className="mt-2 text-sm text-foreground-muted">
              {product.tags.join(" · ")}
            </p>
          </div>

          {product.licenseNote ? (
            <div className="border border-border bg-background-elevated p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-foreground-subtle">
                License
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                {product.licenseNote}
              </p>
              <Link
                href="/legal/licenses"
                className="mt-3 inline-block text-sm text-accent hover:text-accent-hover"
              >
                Full license notes
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
