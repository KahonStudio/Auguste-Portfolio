import type { SiteContent } from "@/types";

export const site: SiteContent = {
  brandName: "James Raphael Ibay",
  shortName: "James Raphael Ibay",
  screenName: "Auguste",
  tagline: "Games and software, built with intention.",
  description:
    "I design and build video games with original art, and software tools for developers and creators. Online I go by Auguste. Browse my work, download free releases on itch.io, or commission custom work.",
  email: "contact@imauguste.com",
  location: "Available remotely worldwide",
  nav: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Commissions", href: "/commissions" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footerNav: [
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
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jamesibay/" },
  ],
  hero: {
    headline: "I create games and software with original craft.",
    supporting:
      "From playable experiences with my own art to tools that help other developers ship — everything I build is production-minded and ready to use.",
    primaryCta: { label: "View Work", href: "/work" },
    secondaryCta: { label: "Commission Work", href: "/commissions" },
    atmosphereImage: "/images/hero-atmosphere.svg",
    // Placeholder demo loop — replace with your Cloudinary .mp4/.webm URL
    backgroundVideoUrl:
      "https://res.cloudinary.com/demo/video/upload/w_1920,q_auto/docs/walking_talking.mp4",
    // Placeholder — replace with your YouTube reel URL
    reelYoutubeUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
  },
  about: {
    headline: "I build what I want to play — and tools that help others ship.",
    paragraphs: [
      "I am a developer and artist focused on games and software. Online I go by Auguste. I write systems, design interfaces, create art, and ship work people can play, download, and build with.",
      "My work sits at the intersection of craft and engineering: playable games with original visuals, and software tools shaped by real production needs. I care about clear scopes, reliable delivery, and work that holds up after launch.",
      "Whether you find me as Auguste or James Raphael Ibay, commissioning custom work means the same thing: organized communication, production focus, and a process built for trust.",
    ],
  },
  portraitImage: "/images/portrait.png",
};
