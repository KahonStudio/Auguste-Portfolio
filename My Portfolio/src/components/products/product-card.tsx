import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { RevealImage } from "@/components/motion/reveal-image";
import { cn } from "@/lib/utils";

const kindLabel: Record<Product["kind"], string> = {
  game: "Game",
  software: "Software",
  "asset-pack": "Asset Pack",
};

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        "group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <RevealImage className="overflow-hidden border border-border bg-background-muted">
        <div className="relative aspect-[16/10]">
          <Image
            src={product.coverImage}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </RevealImage>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.16em] text-foreground-subtle">
            {kindLabel[product.kind]}
            {product.status === "coming-soon" ? " · Coming soon" : null}
          </p>
          <p className="text-sm text-accent">{product.priceLabel}</p>
        </div>
        <h3 className="text-lg text-foreground transition-colors group-hover:text-accent">
          {product.title}
        </h3>
        <p className="text-sm leading-relaxed text-foreground-muted">
          {product.tagline}
        </p>
      </div>
    </Link>
  );
}
