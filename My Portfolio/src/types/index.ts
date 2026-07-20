export type ProductKind = "game" | "software" | "asset-pack";
export type ProductStatus = "available" | "coming-soon";

export type Product = {
  slug: string;
  title: string;
  kind: ProductKind;
  tagline: string;
  description: string;
  longDescription: string;
  priceLabel: string;
  itchUrl: string;
  coverImage: string;
  gallery: string[];
  tags: string[];
  engine?: string;
  platforms?: string[];
  featured: boolean;
  status: ProductStatus;
  licenseNote?: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  role: string;
  summary: string;
  description: string;
  outcomes: string[];
  images: string[];
  coverImage: string;
  year: number;
  tags: string[];
  links: ProjectLink[];
  featured: boolean;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  idealFor: string;
};

export type ExperienceItem = {
  id: string;
  org: string;
  role: string;
  period: string;
  summary: string;
};

export type ProcessStep = {
  id: string;
  title: string;
  description: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type LegalPage = {
  slug: string;
  title: string;
  updatedAt: string;
  sections: { heading: string; body: string }[];
};

export type SiteContent = {
  brandName: string;
  shortName: string;
  /** Online / storefront screen name (not a studio name). */
  screenName: string;
  tagline: string;
  description: string;
  email: string;
  location: string;
  nav: NavItem[];
  footerNav: NavItem[];
  socials: SocialLink[];
  hero: {
    headline: string;
    supporting: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    atmosphereImage: string;
  };
  about: {
    headline: string;
    paragraphs: string[];
  };
  portraitImage: string;
};
