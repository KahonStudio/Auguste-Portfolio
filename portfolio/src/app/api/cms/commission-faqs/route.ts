import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { mapFaq } from "@/lib/content/mappers";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { faqInputSchema } from "@/lib/validations/cms";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 503 });
  }
  const rows = await prisma.commissionFaq.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(
    rows.map((row) => ({ ...mapFaq(row), sortOrder: row.sortOrder })),
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

  const parsed = faqInputSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const existing = await prisma.commissionFaq.findUnique({ where: { id: data.id } });
  if (existing) {
    return NextResponse.json({ error: "FAQ id already exists." }, { status: 409 });
  }

  const count = await prisma.commissionFaq.count();
  const row = await prisma.commissionFaq.create({
    data: {
      id: data.id,
      question: data.question,
      answer: data.answer,
      sortOrder: data.sortOrder ?? count,
    },
  });

  return NextResponse.json({ ...mapFaq(row), sortOrder: row.sortOrder }, { status: 201 });
}
