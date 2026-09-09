import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { mapExperience } from "@/lib/content/mappers";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { experienceInputSchema } from "@/lib/validations/cms";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
  }
  const rows = await prisma.experienceEntry.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(
    rows.map((row) => ({ ...mapExperience(row), sortOrder: row.sortOrder })),
  );
}

export async function POST(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = experienceInputSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const existing = await prisma.experienceEntry.findUnique({ where: { id: data.id } });
  if (existing) {
    return NextResponse.json({ error: "Experience id already exists." }, { status: 409 });
  }

  const count = await prisma.experienceEntry.count();
  const row = await prisma.experienceEntry.create({
    data: {
      id: data.id,
      org: data.org,
      role: data.role,
      period: data.period,
      summary: data.summary,
      sortOrder: data.sortOrder ?? count,
    },
  });

  return NextResponse.json(
    { ...mapExperience(row), sortOrder: row.sortOrder },
    { status: 201 },
  );
}
