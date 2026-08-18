import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { mapService } from "@/lib/content/mappers";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { serviceInputSchema } from "@/lib/validations/cms";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "Database is not configured." },
      { status: 503 },
    );
  }
  const rows = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(
    rows.map((row) => ({ ...mapService(row), sortOrder: row.sortOrder })),
  );
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

  const parsed = serviceInputSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const existing = await prisma.service.findUnique({ where: { id: data.id } });
  if (existing) {
    return NextResponse.json({ error: "Service id already exists." }, { status: 409 });
  }

  const count = await prisma.service.count();
  const row = await prisma.service.create({
    data: {
      id: data.id,
      title: data.title,
      description: data.description,
      deliverables: JSON.stringify(data.deliverables),
      idealFor: data.idealFor,
      sortOrder: data.sortOrder ?? count,
    },
  });

  return NextResponse.json({ ...mapService(row), sortOrder: row.sortOrder }, { status: 201 });
}
