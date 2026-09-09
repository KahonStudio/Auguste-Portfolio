import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { mapExperience } from "@/lib/content/mappers";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { experienceInputSchema } from "@/lib/validations/cms";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
  }

  const { id } = await params;
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const full = experienceInputSchema.safeParse({
    ...(typeof json === "object" && json !== null ? json : {}),
    id,
  });
  if (!full.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: full.error.flatten() },
      { status: 400 },
    );
  }

  const data = full.data;
  try {
    const row = await prisma.experienceEntry.update({
      where: { id },
      data: {
        org: data.org,
        role: data.role,
        period: data.period,
        summary: data.summary,
        sortOrder: data.sortOrder,
      },
    });
    return NextResponse.json({ ...mapExperience(row), sortOrder: row.sortOrder });
  } catch {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
  }
  const { id } = await params;
  try {
    await prisma.experienceEntry.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
}
