"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isVideoUrl } from "@/lib/utils";

async function uploadFile(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/api/cms/media", { method: "POST", body });
  if (!res.ok) {
    const json = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(json?.error ?? "Upload failed.");
  }
  const row = (await res.json()) as { url: string };
  return row.url;
}

function Preview({ url }: { url: string }) {
  if (!url) {
    return (
      <div className="flex aspect-video items-center justify-center border border-dashed border-border bg-background-muted text-xs text-foreground-subtle">
        No media yet
      </div>
    );
  }

  if (isVideoUrl(url)) {
    return (
      <div className="relative aspect-video overflow-hidden border border-border bg-background-muted">
        <video
          src={url}
          className="h-full w-full object-cover"
          muted
          playsInline
          controls
        />
        <span className="absolute left-2 top-2 bg-background/80 px-2 py-0.5 text-[10px] uppercase tracking-wider text-foreground">
          Video
        </span>
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden border border-border bg-background-muted">
      <Image
        src={url}
        alt=""
        fill
        className="object-cover"
        sizes="400px"
        unoptimized
      />
    </div>
  );
}

type MediaUrlFieldProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  hint?: string;
  /** Show Paste URL override. Default true. */
  allowPasteUrl?: boolean;
};

export function MediaUrlField({
  label,
  value,
  onChange,
  accept = "image/*,video/*",
  hint,
  allowPasteUrl = true,
}: MediaUrlFieldProps) {
  const inputId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUrl, setShowUrl] = useState(false);

  async function onPick(file: File | null) {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const url = await uploadFile(file);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="space-y-3">
      <Label htmlFor={inputId}>{label}</Label>
      <Preview url={value} />
      <div className="flex flex-wrap gap-2">
        <input
          ref={fileRef}
          id={inputId}
          type="file"
          accept={accept}
          className="sr-only"
          disabled={uploading}
          onChange={(e) => onPick(e.target.files?.[0] ?? null)}
        />
        <Button
          type="button"
          size="sm"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
        >
          {uploading ? "Uploading…" : value ? "Replace file" : "Upload file"}
        </Button>
        {value ? (
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => onChange("")}
          >
            Clear
          </Button>
        ) : null}
        {allowPasteUrl ? (
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => setShowUrl((v) => !v)}
          >
            {showUrl ? "Hide URL" : "Paste URL"}
          </Button>
        ) : null}
      </div>
      {allowPasteUrl && showUrl ? (
        <Input
          value={value}
          placeholder="https://res.cloudinary.com/…"
          onChange={(e) => onChange(e.target.value)}
        />
      ) : null}
      {hint ? <p className="text-xs text-foreground-subtle">{hint}</p> : null}
      {error ? <p className="text-sm text-danger">{error}</p> : null}
    </div>
  );
}

type MediaGalleryFieldProps = {
  label: string;
  value: string[];
  onChange: (urls: string[]) => void;
  accept?: string;
  hint?: string;
};

export function MediaGalleryField({
  label,
  value,
  onChange,
  accept = "image/*,video/*",
  hint,
}: MediaGalleryFieldProps) {
  const inputId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onPick(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    setError(null);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        uploaded.push(await uploadFile(file));
      }
      onChange([...value, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function removeAt(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <Label htmlFor={inputId}>{label}</Label>
      {value.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {value.map((url, index) => (
            <div key={`${url}-${index}`} className="space-y-2">
              <Preview url={url} />
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => removeAt(index)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex aspect-[21/9] items-center justify-center border border-dashed border-border bg-background-muted text-xs text-foreground-subtle">
          No gallery media yet
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        <input
          ref={fileRef}
          id={inputId}
          type="file"
          accept={accept}
          multiple
          className="sr-only"
          disabled={uploading}
          onChange={(e) => onPick(e.target.files)}
        />
        <Button
          type="button"
          size="sm"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
        >
          {uploading ? "Uploading…" : "Add images or video"}
        </Button>
      </div>
      {hint ? <p className="text-xs text-foreground-subtle">{hint}</p> : null}
      {error ? <p className="text-sm text-danger">{error}</p> : null}
    </div>
  );
}
