/**
 * Content accessors.
 * Prefer DB when DATABASE_URL is set and rows exist; otherwise fall back to
 * static src/content/* so the public site keeps working without CMS setup.
 */
import { cache } from "react";
import { experience as staticExperience } from "@/content/experience";
import { legalPages } from "@/content/legal";
import {
  commissionFaqs as staticFaqs,
  commissionProcess as staticProcess,
  workingWithMe as staticWorking,
} from "@/content/process";
import { projects as staticProjects } from "@/content/projects";
import { services as staticServices } from "@/content/services";
import { site as staticSite } from "@/content/site";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import {
  mapExperience,
  mapFaq,
  mapProcessStep,
  mapProject,
  mapService,
  parseSiteData,
} from "@/lib/content/mappers";
import type {
  ExperienceItem,
  FaqItem,
  LegalPage,
  ProcessStep,
  Project,
  Service,
  SiteContent,
} from "@/types";

export const getSite = cache(async (): Promise<SiteContent> => {
  if (!isDatabaseConfigured()) return staticSite;
  try {
    const row = await prisma.siteSettings.findUnique({ where: { id: "default" } });
    if (!row) return staticSite;
    return parseSiteData(row.data);
  } catch {
    return staticSite;
  }
});

export const getProjects = cache(async (): Promise<Project[]> => {
  if (!isDatabaseConfigured()) return staticProjects;
  try {
    const rows = await prisma.project.findMany({ orderBy: { sortOrder: "asc" } });
    if (rows.length === 0) return staticProjects;
    return rows.map(mapProject);
  } catch {
    return staticProjects;
  }
});

export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getProjects();
  return all.filter((p) => p.featured);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  if (isDatabaseConfigured()) {
    try {
      const row = await prisma.project.findUnique({ where: { slug } });
      if (row) return mapProject(row);
    } catch {
      /* fall through */
    }
  }
  return staticProjects.find((p) => p.slug === slug);
}

export async function getProjectSlugs(): Promise<string[]> {
  const all = await getProjects();
  return all.map((p) => p.slug);
}

export const getServices = cache(async (): Promise<Service[]> => {
  if (!isDatabaseConfigured()) return staticServices;
  try {
    const rows = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
    if (rows.length === 0) return staticServices;
    return rows.map(mapService);
  } catch {
    return staticServices;
  }
});

export const getExperience = cache(async (): Promise<ExperienceItem[]> => {
  if (!isDatabaseConfigured()) return staticExperience;
  try {
    const rows = await prisma.experienceEntry.findMany({
      orderBy: { sortOrder: "asc" },
    });
    if (rows.length === 0) return staticExperience;
    return rows.map(mapExperience);
  } catch {
    return staticExperience;
  }
});

export const getCommissionProcess = cache(async (): Promise<ProcessStep[]> => {
  if (!isDatabaseConfigured()) return staticProcess;
  try {
    const rows = await prisma.commissionProcessStep.findMany({
      orderBy: { sortOrder: "asc" },
    });
    if (rows.length === 0) return staticProcess;
    return rows.map(mapProcessStep);
  } catch {
    return staticProcess;
  }
});

export const getCommissionFaqs = cache(async (): Promise<FaqItem[]> => {
  if (!isDatabaseConfigured()) return staticFaqs;
  try {
    const rows = await prisma.commissionFaq.findMany({
      orderBy: { sortOrder: "asc" },
    });
    if (rows.length === 0) return staticFaqs;
    return rows.map(mapFaq);
  } catch {
    return staticFaqs;
  }
});

export const getWorkingWithMe = cache(async (): Promise<ProcessStep[]> => {
  if (!isDatabaseConfigured()) return staticWorking;
  try {
    const rows = await prisma.workingWithMeStep.findMany({
      orderBy: { sortOrder: "asc" },
    });
    if (rows.length === 0) return staticWorking;
    return rows.map(mapProcessStep);
  } catch {
    return staticWorking;
  }
});

export async function getLegalPages(): Promise<LegalPage[]> {
  return legalPages;
}

export async function getLegalPageBySlug(slug: string): Promise<LegalPage | undefined> {
  return legalPages.find((p) => p.slug === slug);
}

export async function getLegalSlugs(): Promise<string[]> {
  return legalPages.map((p) => p.slug);
}
