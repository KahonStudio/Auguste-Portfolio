import type { Project, Service, SiteContent } from "@/types";
import type { Project as DbProject, Service as DbService } from "@prisma/client";

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

export function parseSiteData(raw: string): SiteContent {
  return JSON.parse(raw) as SiteContent;
}
