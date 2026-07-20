import type { SiteContent } from "@/types";

export const site: SiteContent = {
  brandName: "James Raphael Ibay",
  shortName: "James Raphael Ibay",
  screenName: "Auguste",
  tagline: "Games and software, built with intention.",
  description:
    "I design and build video games with original art, and software tools for developers and creators. Online I go by Auguste. Browse my products on itch.io, or commission custom work.",
  email: "hello@jamesraphaelibay.com",
  location: "Available remotely worldwide",
  nav: [
    { label: "Products", href: "/products" },
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Commissions", href: "/commissions" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footerNav: [
    { label: "Products", href: "/products" },
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Commissions", href: "/commissions" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Terms", href: "/legal/terms" },
    { label: "Privacy", href: "/legal/privacy" },
    { label: "Licenses", href: "/legal/licenses" },
  ],
  socials: [
    { label: "itch.io", href: "https://auguste.itch.io" },
    { label: "GitHub", href: "https://github.com" },
    { label: "ArtStation", href: "https://www.artstation.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com" },
  ],
  hero: {
    headline: "I create games and software with original craft.",
    supporting:
      "From playable experiences with my own art to tools that help other developers ship — everything I build is production-minded and ready to use.",
    primaryCta: { label: "View Products", href: "/products" },
    secondaryCta: { label: "Commission Work", href: "/commissions" },
    atmosphereImage: "/images/hero-atmosphere.svg",
  },
  about: {
    headline: "I build what I want to play — and tools that help others ship.",
    paragraphs: [
      "I am a developer and artist focused on games and software. Online and on storefronts, I go by Auguste. I write systems, design interfaces, create art, and ship products that people can buy, play, and build with.",
      "My work sits at the intersection of craft and engineering: playable games with original visuals, and software tools shaped by real production needs. I care about clear scopes, reliable delivery, and work that holds up after launch.",
      "Whether you find me as Auguste or James Raphael Ibay, commissioning custom work means the same thing: organized communication, production focus, and a process built for trust.",
    ],
  },
  portraitImage: "/images/portrait.png",
};
