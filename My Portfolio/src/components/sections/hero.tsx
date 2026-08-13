"use client";

import Link from "next/link";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";

type HeroProps = {
  brandName: string;
  screenName: string;
  headline: string;
  supporting: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  portraitImage: string;
  backgroundVideoUrl?: string;
  reelYoutubeUrl?: string;
};

export function Hero({
  brandName,
  screenName,
  headline,
  supporting,
  primaryCta,
  secondaryCta,
  portraitImage,
  backgroundVideoUrl = "",
  reelYoutubeUrl = "",
}: HeroProps) {
  const reduceMotion = useReducedMotion();
  const showVideo = Boolean(backgroundVideoUrl) && !reduceMotion;
  const showReel = Boolean(reelYoutubeUrl);

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={portraitImage}
          alt={`${brandName}, also known as ${screenName}`}
          fill
          priority
          className="object-cover object-[32%_12%] sm:object-[28%_10%]"
          sizes="100vw"
        />
        {showVideo ? (
          <video
            className="absolute inset-0 h-full w-full object-cover object-[32%_12%] sm:object-[28%_10%]"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={portraitImage}
            aria-hidden
          >
            <source src={backgroundVideoUrl} />
          </video>
        ) : null}
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-l from-background via-background/80 to-background/20"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/35"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-6 pb-20 pt-28 lg:justify-center lg:px-8 lg:pb-24 lg:pt-32">
        <div className="ml-auto w-full max-w-xl">
          <FadeIn>
            <p className="font-display text-4xl tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Hi, I am {screenName}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-6 text-xl text-foreground-muted sm:text-2xl">
              {headline}
            </h1>
          </FadeIn>
          <FadeIn delay={0.18}>
            <p className="mt-4 text-base leading-relaxed text-foreground-subtle sm:text-lg">
              {supporting}
            </p>
          </FadeIn>
          <FadeIn delay={0.26}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            </div>
            {showReel ? (
              <p className="mt-4">
                <a
                  href={reelYoutubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent underline-offset-4 hover:text-accent-hover hover:underline"
                >
                  Watch reel
                </a>
              </p>
            ) : null}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
