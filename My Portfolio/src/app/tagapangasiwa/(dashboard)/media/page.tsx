import { MediaLibrary } from "@/components/admin/media-library";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";

export const metadata = {
  title: "Media — Tagapangasiwa",
  robots: { index: false, follow: false },
};

export default async function AdminMediaPage() {
  const rows = isDatabaseConfigured()
    ? await prisma.mediaAsset.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
      })
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl text-foreground">Media</h1>
        <p className="mt-3 text-sm text-foreground-muted">
          Upload images and video to Cloudinary, then paste URLs into content fields.
        </p>
      </div>
      <MediaLibrary
        initial={rows.map((r) => ({
          id: r.id,
          url: r.url,
          publicId: r.publicId,
          resourceType: r.resourceType,
          createdAt: r.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
