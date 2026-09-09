import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { mapProcessStep } from "@/lib/content/mappers";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { processStepInputSchema } from "@/lib/validations/cms";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
  }
  const rows = await prisma.commissionProcessStep.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(
    rows.map((row) => ({ ...mapProcessStep(row), sortOrder: row.sortOrder })),
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

  const parsed = processStepInputSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const existing = await prisma.commissionProcessStep.findUnique({
    where: { id: data.id },
  });
  if (existing) {
    return NextResponse.json({ error: "Step id already exists." }, { status: 409 });
  }

  const count = await prisma.commissionProcessStep.count();
  const row = await prisma.commissionProcessStep.create({
    data: {
      id: data.id,
      title: data.title,
      description: data.description,
      sortOrder: data.sortOrder ?? count,
    },
  });

  return NextResponse.json(
    { ...mapProcessStep(row), sortOrder: row.sortOrder },
    { status: 201 },
  );
}
