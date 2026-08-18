import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { mapProject } from "@/lib/content/mappers";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { projectInputSchema } from "@/lib/validations/cms";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "Database is not configured." },
      { status: 503 },
    );
  }
  const { id } = await params;
  const row = await prisma.project.findUnique({ where: { id } });
  if (!row) return NextResponse.json({ error: "Not found." }, { status: 404 });
  return NextResponse.json({ ...mapProject(row), id: row.id, sortOrder: row.sortOrder });
}

export async function PUT(request: Request, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "Database is not configured." },
      { status: 503 },
    );
  }

  const { id } = await params;
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
  const clash = await prisma.project.findFirst({
    where: { slug: data.slug, NOT: { id } },
  });
  if (clash) {
    return NextResponse.json({ error: "Slug already exists." }, { status: 409 });
  }

  try {
    const row = await prisma.project.update({
      where: { id },
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
        sortOrder: data.sortOrder,
      },
    });
    return NextResponse.json({ ...mapProject(row), id: row.id });
  } catch {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "Database is not configured." },
      { status: 503 },
    );
  }
  const { id } = await params;
  try {
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
}
