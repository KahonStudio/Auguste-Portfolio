import type { Metadata } from "next";
import { ProductCard } from "@/components/products/product-card";
import { SectionHeader } from "@/components/sections/section-header";
import { FadeIn } from "@/components/motion/fade-in";
import { getProducts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Games, software, and asset packs by James Raphael Ibay — available on itch.io.",
};

export default function ProductsPage() {
  const products = getProducts();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-24">
      <SectionHeader
        eyebrow="My Products"
        title="The store."
        description="I sell digital games, software, and art packs on itch.io. Each listing here links out for purchase."
      />
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <FadeIn key={product.slug} delay={i * 0.04}>
            <ProductCard product={product} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
