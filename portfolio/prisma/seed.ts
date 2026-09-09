import { PrismaClient } from "@prisma/client";
import { experience } from "../src/content/experience";
import {
  commissionFaqs,
  commissionProcess,
  workingWithMe,
} from "../src/content/process";
import { projects } from "../src/content/projects";
import { services } from "../src/content/services";
import { site } from "../src/content/site";

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

  for (const [index, item] of experience.entries()) {
    await prisma.experienceEntry.upsert({
      where: { id: item.id },
      create: {
        id: item.id,
        org: item.org,
        role: item.role,
        period: item.period,
        summary: item.summary,
        sortOrder: index,
      },
      update: {
        org: item.org,
        role: item.role,
        period: item.period,
        summary: item.summary,
        sortOrder: index,
      },
    });
  }

  for (const [index, step] of commissionProcess.entries()) {
    await prisma.commissionProcessStep.upsert({
      where: { id: step.id },
      create: {
        id: step.id,
        title: step.title,
        description: step.description,
        sortOrder: index,
      },
      update: {
        title: step.title,
        description: step.description,
        sortOrder: index,
      },
    });
  }

  for (const [index, faq] of commissionFaqs.entries()) {
    await prisma.commissionFaq.upsert({
      where: { id: faq.id },
      create: {
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        sortOrder: index,
      },
      update: {
        question: faq.question,
        answer: faq.answer,
        sortOrder: index,
      },
    });
  }

  for (const [index, step] of workingWithMe.entries()) {
    await prisma.workingWithMeStep.upsert({
      where: { id: step.id },
      create: {
        id: step.id,
        title: step.title,
        description: step.description,
        sortOrder: index,
      },
      update: {
        title: step.title,
        description: step.description,
        sortOrder: index,
      },
    });
  }

  console.log(
    "Seeded site, projects, services, experience, commission process/FAQs, working-with-me.",
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
