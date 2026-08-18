"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type MediaRow = {
  id: string;
  url: string;
  publicId: string;
  resourceType: string;
  createdAt: string;
};

type MediaLibraryProps = {
  initial: MediaRow[];
};

export function MediaLibrary({ initial }: MediaLibraryProps) {
  const [items, setItems] = useState(initial);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  async function onUpload(file: File | null) {
    if (!file) return;
    setUploading(true);
    setError(null);
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/cms/media", { method: "POST", body });
    setUploading(false);
    if (!res.ok) {
      const json = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(json?.error ?? "Upload failed.");
      return;
    }
    const row = (await res.json()) as MediaRow;
    setItems((prev) => [row, ...prev]);
  }

  async function copyUrl(url: string) {
    await navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Input
          type="file"
          accept="image/*,video/*"
          disabled={uploading}
          onChange={(e) => onUpload(e.target.files?.[0] ?? null)}
        />
        {uploading ? (
          <p className="text-sm text-foreground-muted">Uploading…</p>
        ) : null}
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        <p className="text-sm text-foreground-subtle">
          Browse everything uploaded to Cloudinary. Prefer uploading directly
          inside Site or Project editors — this page is for review and re-use.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="space-y-3 border border-border bg-background-elevated p-3"
          >
            <div className="relative aspect-video overflow-hidden bg-background-muted">
              {item.resourceType === "video" ? (
                <video src={item.url} className="h-full w-full object-cover" muted />
              ) : (
                <Image
                  src={item.url}
                  alt={item.publicId}
                  fill
                  className="object-cover"
                  sizes="300px"
                  unoptimized
                />
              )}
            </div>
            <p className="truncate text-xs text-foreground-subtle">{item.publicId}</p>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => copyUrl(item.url)}
            >
              {copied === item.url ? "Copied" : "Copy URL"}
            </Button>
          </article>
        ))}
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-foreground-muted">No uploads yet.</p>
      ) : null}
    </div>
  );
}
