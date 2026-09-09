import { z } from "zod";

const navItemSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

const socialSchema = z.object({
  label: z.string().min(1),
  href: z.string().url(),
});

const ctaSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const siteContentSchema = z.object({
  brandName: z.string().min(1),
  shortName: z.string().min(1),
  screenName: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  email: z.string().email(),
  location: z.string().min(1),
  nav: z.array(navItemSchema),
  footerNav: z.array(navItemSchema),
  socials: z.array(socialSchema),
  hero: z.object({
    headline: z.string().min(1),
    supporting: z.string().min(1),
    primaryCta: ctaSchema,
    secondaryCta: ctaSchema,
    atmosphereImage: z.string().min(1),
    backgroundVideoUrl: z.string(),
    reelYoutubeUrl: z.string(),
  }),
  about: z.object({
    headline: z.string().min(1),
    paragraphs: z.array(z.string().min(1)).min(1),
  }),
  portraitImage: z.string().min(1),
});

export const projectLinkSchema = z.object({
  label: z.string().min(1, "Link needs a button label."),
  href: z.string().url("Link needs a full URL (https://…)"),
});

export const projectInputSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase slug with hyphens."),
  title: z.string().min(1),
  role: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().min(1),
  outcomes: z.array(z.string()),
  images: z.array(z.string()),
  coverImage: z.string().min(1),
  year: z.coerce.number().int().min(1990).max(2100),
  tags: z.array(z.string()),
  links: z.array(projectLinkSchema),
  featured: z.boolean(),
  sortOrder: z.coerce.number().int().optional(),
});

export const serviceInputSchema = z.object({
  id: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase id with hyphens."),
  title: z.string().min(1),
  description: z.string().min(1),
  deliverables: z.array(z.string()),
  idealFor: z.string().min(1),
  sortOrder: z.coerce.number().int().optional(),
});

const slugId = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase id with hyphens.");

export const experienceInputSchema = z.object({
  id: slugId,
  org: z.string().min(1),
  role: z.string().min(1),
  period: z.string().min(1),
  summary: z.string().min(1),
  sortOrder: z.coerce.number().int().optional(),
});

export const processStepInputSchema = z.object({
  id: slugId,
  title: z.string().min(1),
  description: z.string().min(1),
  sortOrder: z.coerce.number().int().optional(),
});

export const faqInputSchema = z.object({
  id: slugId,
  question: z.string().min(1),
  answer: z.string().min(1),
  sortOrder: z.coerce.number().int().optional(),
});

export type ProjectInput = z.infer<typeof projectInputSchema>;
export type ServiceInput = z.infer<typeof serviceInputSchema>;
export type ExperienceInput = z.infer<typeof experienceInputSchema>;
export type ProcessStepInput = z.infer<typeof processStepInputSchema>;
export type FaqInput = z.infer<typeof faqInputSchema>;
