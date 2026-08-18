import { v2 as cloudinary } from "cloudinary";

function configured() {
  return Boolean(
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim() &&
      process.env.CLOUDINARY_API_KEY?.trim() &&
      process.env.CLOUDINARY_API_SECRET?.trim() &&
      process.env.CLOUDINARY_API_SECRET !== process.env.CLOUDINARY_API_KEY,
  );
}

export function isCloudinaryConfigured(): boolean {
  return configured();
}

function ensureCloudinary() {
  if (!configured()) {
    throw new Error(
      "Cloudinary is not configured. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and a real CLOUDINARY_API_SECRET (must not equal the API key).",
    );
  }
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  return cloudinary;
}

export type UploadedAsset = {
  publicId: string;
  url: string;
  resourceType: string;
  format?: string;
  bytes?: number;
  width?: number;
  height?: number;
};

function formatCloudinaryError(error: unknown): Error {
  if (!error || typeof error !== "object") {
    return new Error("Cloudinary upload failed.");
  }
  const err = error as {
    message?: string;
    http_code?: number;
    error?: { message?: string };
  };
  const detail = err.error?.message || err.message || "Cloudinary upload failed.";
  if (err.http_code === 403 || /forbidden|permission/i.test(detail)) {
    return new Error(
      "Cloudinary rejected the upload (403). Your API key is likely restricted. In Cloudinary → Settings → API Keys, use the main full-access API Key + API Secret (not a limited/Media Library-only key), then restart the dev server.",
    );
  }
  return new Error(detail);
}

export async function uploadToCloudinary(
  buffer: Buffer,
  options?: {
    folder?: string;
    resourceType?: "image" | "video" | "auto";
    filename?: string;
  },
): Promise<UploadedAsset> {
  const client = ensureCloudinary();
  const folder = options?.folder ?? "auguste-portfolio";
  const resourceType = options?.resourceType ?? "auto";

  const result = await new Promise<{
    public_id: string;
    secure_url: string;
    resource_type: string;
    format?: string;
    bytes?: number;
    width?: number;
    height?: number;
  }>((resolve, reject) => {
    const stream = client.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        ...(options?.filename
          ? { filename_override: options.filename, use_filename: true }
          : {}),
      },
      (error, uploadResult) => {
        if (error || !uploadResult) {
          reject(formatCloudinaryError(error));
          return;
        }
        resolve(uploadResult);
      },
    );
    stream.end(buffer);
  });

  return {
    publicId: result.public_id,
    url: result.secure_url,
    resourceType: result.resource_type,
    format: result.format,
    bytes: result.bytes,
    width: result.width,
    height: result.height,
  };
}
