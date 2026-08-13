import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { mapProject } from "@/lib/content/mappers";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { projectInputSchema } from "@/lib/validations/cms";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "Database is not configured." },
      { status: 503 },
    );
  }
  const rows = await prisma.project.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(rows.map(mapProject).map((p, i) => ({ ...p, id: rows[i].id, sortOrder: rows[i].sortOrder })));
}

export async function POST(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "Database is not configured." },
      { status: 503 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = projectInputSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const existing = await prisma.project.findUnique({ where: { slug: data.slug } });
  if (existing) {
    return NextResponse.json({ error: "Slug already exists." }, { status: 409 });
  }

  const count = await prisma.project.count();
  const row = await prisma.project.create({
    data: {
      slug: data.slug,
      title: data.title,
      role: data.role,
      summary: data.summary,
      description: data.description,
      outcomes: JSON.stringify(data.outcomes),
      images: JSON.stringify(data.images),
      coverImage: data.coverImage,
      year: data.year,
      tags: JSON.stringify(data.tags),
      links: JSON.stringify(data.links),
      featured: data.featured,
      sortOrder: data.sortOrder ?? count,
    },
  });

  return NextResponse.json({ ...mapProject(row), id: row.id }, { status: 201 });
}
