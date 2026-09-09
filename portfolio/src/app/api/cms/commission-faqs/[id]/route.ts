import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { mapFaq } from "@/lib/content/mappers";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { faqInputSchema } from "@/lib/validations/cms";

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

  const full = faqInputSchema.safeParse({
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
    const row = await prisma.commissionFaq.update({
      where: { id },
      data: {
        question: data.question,
        answer: data.answer,
        sortOrder: data.sortOrder,
      },
    });
    return NextResponse.json({ ...mapFaq(row), sortOrder: row.sortOrder });
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
    await prisma.commissionFaq.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
}
