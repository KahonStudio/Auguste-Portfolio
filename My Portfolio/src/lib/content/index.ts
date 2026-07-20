/**
 * Content accessors.
 * CMS-ready: swap these implementations to fetch from a headless CMS later
 * without changing page components. Keys are stable string IDs for future i18n.
 */
import { experience } from "@/content/experience";
import { legalPages } from "@/content/legal";
import { commissionFaqs, commissionProcess, workingWithMe } from "@/content/process";
import { products } from "@/content/products";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { site } from "@/content/site";
import type {
  ExperienceItem,
  FaqItem,
  LegalPage,
  ProcessStep,
  Product,
  Project,
  Service,
  SiteContent,
} from "@/types";

export function getSite(): SiteContent {
  return site;
}

export function getProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured && p.status === "available");
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductSlugs(): string[] {
  return products.map((p) => p.slug);
}

export function getProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function getServices(): Service[] {
  return services;
}

export function getExperience(): ExperienceItem[] {
  return experience;
}

export function getCommissionProcess(): ProcessStep[] {
  return commissionProcess;
}

export function getCommissionFaqs(): FaqItem[] {
  return commissionFaqs;
}

export function getWorkingWithMe(): ProcessStep[] {
  return workingWithMe;
}

export function getLegalPages(): LegalPage[] {
  return legalPages;
}

export function getLegalPageBySlug(slug: string): LegalPage | undefined {
  return legalPages.find((p) => p.slug === slug);
}

export function getLegalSlugs(): string[] {
  return legalPages.map((p) => p.slug);
}
