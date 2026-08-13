import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import { siteContentSchema } from "@/lib/validations/cms";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "Database is not configured." },
      { status: 503 },
    );
  }
  const row = await prisma.siteSettings.findUnique({ where: { id: "default" } });
  if (!row) {
    return NextResponse.json({ error: "Site settings missing. Run seed." }, { status: 404 });
  }
  return NextResponse.json(JSON.parse(row.data));
}

export async function PUT(request: Request) {
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

  const parsed = siteContentSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const row = await prisma.siteSettings.upsert({
    where: { id: "default" },
    create: { id: "default", data: JSON.stringify(parsed.data) },
    update: { data: JSON.stringify(parsed.data) },
  });

  return NextResponse.json(JSON.parse(row.data));
}
