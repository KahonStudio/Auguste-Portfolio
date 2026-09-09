import type {
  ExperienceItem,
  FaqItem,
  ProcessStep,
  Project,
  Service,
  SiteContent,
} from "@/types";
import type {
  CommissionFaq as DbFaq,
  CommissionProcessStep as DbProcessStep,
  ExperienceEntry as DbExperience,
  Project as DbProject,
  Service as DbService,
  WorkingWithMeStep as DbWorkingStep,
} from "@prisma/client";

export function mapProject(row: DbProject): Project {
  return {
    slug: row.slug,
    title: row.title,
    role: row.role,
    summary: row.summary,
    description: row.description,
    outcomes: JSON.parse(row.outcomes) as string[],
    images: JSON.parse(row.images) as string[],
    coverImage: row.coverImage,
    year: row.year,
    tags: JSON.parse(row.tags) as string[],
    links: JSON.parse(row.links) as Project["links"],
    featured: row.featured,
  };
}

export function mapService(row: DbService): Service {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    deliverables: JSON.parse(row.deliverables) as string[],
    idealFor: row.idealFor,
  };
}

export function mapExperience(row: DbExperience): ExperienceItem {
  return {
    id: row.id,
    org: row.org,
    role: row.role,
    period: row.period,
    summary: row.summary,
  };
}

export function mapProcessStep(
  row: DbProcessStep | DbWorkingStep,
): ProcessStep {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
  };
}

export function mapFaq(row: DbFaq): FaqItem {
  return {
    id: row.id,
    question: row.question,
    answer: row.answer,
  };
}

export function parseSiteData(raw: string): SiteContent {
  return JSON.parse(raw) as SiteContent;
}
