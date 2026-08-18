import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { isCloudinaryConfigured, uploadToCloudinary } from "@/lib/cloudinary";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "Database is not configured." },
      { status: 503 },
    );
  }
  const rows = await prisma.mediaAsset.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return NextResponse.json(rows);
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
  if (!isCloudinaryConfigured()) {
    return NextResponse.json(
      {
        error:
          "Cloudinary is not configured. Check CLOUDINARY_API_SECRET (it must not equal CLOUDINARY_API_KEY).",
      },
      { status: 503 },
    );
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing file." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    if (buffer.byteLength === 0) {
      return NextResponse.json({ error: "Empty file." }, { status: 400 });
    }

    // ~100MB guard (Cloudinary free plans vary; keep a clear client message)
    if (buffer.byteLength > 100 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File is larger than 100MB. Compress the video and try again." },
        { status: 413 },
      );
    }

    const isVideo =
      file.type.startsWith("video/") ||
      /\.(mp4|webm|mov|m4v)$/i.test(file.name);
    const uploaded = await uploadToCloudinary(buffer, {
      resourceType: isVideo ? "video" : "image",
      filename: file.name,
    });

    const row = await prisma.mediaAsset.create({
      data: {
        publicId: uploaded.publicId,
        url: uploaded.url,
        resourceType: uploaded.resourceType,
        format: uploaded.format,
        bytes: uploaded.bytes,
        width: uploaded.width,
        height: uploaded.height,
      },
    });

    return NextResponse.json(row, { status: 201 });
  } catch (err) {
    console.error("Media upload failed", err);
    const message =
      err instanceof Error ? err.message : "Upload failed.";
    const status = /403|permission|restricted/i.test(message) ? 403 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
