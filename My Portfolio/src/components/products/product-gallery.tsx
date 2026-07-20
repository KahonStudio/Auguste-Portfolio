"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { RevealImage } from "@/components/motion/reveal-image";

type ProductGalleryProps = {
  title: string;
  coverImage: string;
  gallery: string[];
};

export function ProductGallery({
  title,
  coverImage,
  gallery,
}: ProductGalleryProps) {
  const images = [coverImage, ...gallery.filter((src) => src !== coverImage)];
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-4">
      <RevealImage className="relative aspect-[16/10] overflow-hidden border border-border bg-background-muted">
        <Image
          src={images[active] ?? coverImage}
          alt={`${title} — image ${active + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority
        />
      </RevealImage>
      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                "relative aspect-[16/10] overflow-hidden border transition-colors",
                active === index
                  ? "border-accent"
                  : "border-border hover:border-border-strong",
              )}
              aria-label={`Show image ${index + 1}`}
              aria-pressed={active === index}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="120px"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
