import type { MetadataRoute } from "next";
import {
  getLegalSlugs,
  getProductSlugs,
  getProjectSlugs,
} from "@/lib/content";

const base = "https://jamesraphaelibay.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/products",
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

  const products = getProductSlugs().map((slug) => ({
    url: `${base}/products/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const work = getProjectSlugs().map((slug) => ({
    url: `${base}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const legal = getLegalSlugs().map((slug) => ({
    url: `${base}/legal/${slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [...staticRoutes, ...products, ...work, ...legal];
}
