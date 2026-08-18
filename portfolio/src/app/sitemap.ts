import type { MetadataRoute } from "next";
import { getLegalSlugs, getProjectSlugs } from "@/lib/content";

export const dynamic = "force-dynamic";

const base = "https://jamesraphaelibay.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/work",
    "/services",
    "/commissions",
    "/about",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const projectSlugs = await getProjectSlugs();
  const work = projectSlugs.map((slug) => ({
    url: `${base}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const legalSlugs = await getLegalSlugs();
  const legal = legalSlugs.map((slug) => ({
    url: `${base}/legal/${slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [...staticRoutes, ...work, ...legal];
}
