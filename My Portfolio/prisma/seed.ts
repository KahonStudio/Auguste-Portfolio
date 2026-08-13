import { PrismaClient } from "@prisma/client";
import { site } from "../src/content/site";
import { projects } from "../src/content/projects";
import { services } from "../src/content/services";

const prisma = new PrismaClient();

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    create: { id: "default", data: JSON.stringify(site) },
    update: { data: JSON.stringify(site) },
  });

  for (const [index, project] of projects.entries()) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      create: {
        slug: project.slug,
        title: project.title,
        role: project.role,
        summary: project.summary,
        description: project.description,
        outcomes: JSON.stringify(project.outcomes),
        images: JSON.stringify(project.images),
        coverImage: project.coverImage,
        year: project.year,
        tags: JSON.stringify(project.tags),
        links: JSON.stringify(project.links),
        featured: project.featured,
        sortOrder: index,
      },
      update: {
        title: project.title,
        role: project.role,
        summary: project.summary,
        description: project.description,
        outcomes: JSON.stringify(project.outcomes),
        images: JSON.stringify(project.images),
        coverImage: project.coverImage,
        year: project.year,
        tags: JSON.stringify(project.tags),
        links: JSON.stringify(project.links),
        featured: project.featured,
        sortOrder: index,
      },
    });
  }

  for (const [index, service] of services.entries()) {
    await prisma.service.upsert({
      where: { id: service.id },
      create: {
        id: service.id,
        title: service.title,
        description: service.description,
        deliverables: JSON.stringify(service.deliverables),
        idealFor: service.idealFor,
        sortOrder: index,
      },
      update: {
        title: service.title,
        description: service.description,
        deliverables: JSON.stringify(service.deliverables),
        idealFor: service.idealFor,
        sortOrder: index,
      },
    });
  }

  console.log("Seeded site settings, projects, and services.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
