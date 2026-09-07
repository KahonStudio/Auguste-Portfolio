"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { ProjectLink } from "@/types";
import {
  MediaGalleryField,
  MediaUrlField,
} from "@/components/admin/media-fields";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export type ProjectFormValues = {
  slug: string;
  title: string;
  role: string;
  summary: string;
  description: string;
  outcomesText: string;
  images: string[];
  coverImage: string;
  year: number;
  tagsText: string;
  links: ProjectLink[];
  featured: boolean;
};

type ProjectEditorProps = {
  projectId?: string;
  initial: ProjectFormValues;
};

function looksLikeUrl(value: string) {
  return /^https?:\/\//i.test(value.trim());
}

function normalizeLinks(links: ProjectLink[]): ProjectLink[] {
  return links
    .map((link) => {
      const label = link.label.trim();
      const href = link.href.trim();
      // Bare URL pasted into label field by mistake
      if (looksLikeUrl(label) && !href) {
        try {
          const host = new URL(label).hostname.replace(/^www\./, "");
          return { label: host, href: label };
        } catch {
          return { label: "Link", href: label };
        }
      }
      return { label, href };
    })
    .filter((l) => l.label && l.href);
}

export function ProjectEditor({ projectId, initial }: ProjectEditorProps) {
  const router = useRouter();
  const [data, setData] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);
  const isNew = !projectId;

  const payload = useMemo(
    () => ({
      slug: data.slug,
      title: data.title,
      role: data.role,
      summary: data.summary,
      description: data.description,
      outcomes: data.outcomesText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      images: data.images,
      coverImage: data.coverImage,
      year: data.year,
      tags: data.tagsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      links: normalizeLinks(data.links),
      featured: data.featured,
    }),
    [data],
  );

  function updateLink(index: number, patch: Partial<ProjectLink>) {
    setData({
      ...data,
      links: data.links.map((link, i) =>
        i === index ? { ...link, ...patch } : link,
      ),
    });
  }

  function addLink() {
    setData({
      ...data,
      links: [...data.links, { label: "", href: "" }],
    });
  }

  function removeLink(index: number) {
    setData({
      ...data,
      links: data.links.filter((_, i) => i !== index),
    });
  }

  async function save() {
    setStatus("saving");
    setError(null);

    for (const link of normalizeLinks(data.links)) {
      try {
        new URL(link.href);
      } catch {
        setStatus("error");
        setError(
          `Invalid link URL: “${link.href}”. Use a full address like https://kahongames.gumroad.com/l/Ayumemo`,
        );
        return;
      }
    }

    try {
      const res = await fetch(
        isNew ? "/api/cms/projects" : `/api/cms/projects/${projectId}`,
        {
          method: isNew ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        setStatus("error");
        setError(body?.error ?? "Save failed.");
        return;
      }
      await res.json();
      setStatus("saved");
      router.push("/tagapangasiwa/projects");
      router.refresh();
    } catch {
      setStatus("error");
      setError("Network error while saving. Try again.");
    }
  }

  async function remove() {
    if (!projectId) return;
    if (!confirm("Delete this project?")) return;
    const res = await fetch(`/api/cms/projects/${projectId}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Delete failed.");
      return;
    }
    router.push("/tagapangasiwa/projects");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Title">
          <Input
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </Field>
        <Field label="Slug">
          <Input
            value={data.slug}
            onChange={(e) => setData({ ...data, slug: e.target.value })}
          />
        </Field>
        <Field label="Role">
          <Input
            value={data.role}
            onChange={(e) => setData({ ...data, role: e.target.value })}
          />
        </Field>
        <Field label="Year">
          <Input
            type="number"
            value={data.year}
            onChange={(e) =>
              setData({ ...data, year: Number(e.target.value) || data.year })
            }
          />
        </Field>
      </div>
      <Field label="Summary">
        <Textarea
          value={data.summary}
          onChange={(e) => setData({ ...data, summary: e.target.value })}
        />
      </Field>
      <Field label="Description">
        <Textarea
          className="min-h-40"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
      </Field>
      <Field label="Outcomes (one per line)">
        <Textarea
          value={data.outcomesText}
          onChange={(e) => setData({ ...data, outcomesText: e.target.value })}
        />
      </Field>

      <MediaUrlField
        label="Cover image"
        value={data.coverImage}
        accept="image/*"
        allowPasteUrl={false}
        hint="Still image only (like a Steam capsule). Upload a cover image."
        onChange={(coverImage) => setData({ ...data, coverImage })}
      />

      <MediaGalleryField
        label="Gallery (images & video)"
        value={data.images}
        accept="image/*,video/*"
        hint="Upload files or paste a Cloudinary URL (image or video). Videos play on the public project page."
        onChange={(images) => setData({ ...data, images })}
      />

      <Field label="Tags (comma-separated)">
        <Input
          value={data.tagsText}
          onChange={(e) => setData({ ...data, tagsText: e.target.value })}
        />
      </Field>

      <div className="space-y-3">
        <Label>Links</Label>
        <p className="text-xs text-foreground-subtle">
          Button text + full URL. Example: label “Get on Gumroad”, URL{" "}
          https://kahongames.gumroad.com/l/Ayumemo
        </p>
        {data.links.length === 0 ? (
          <p className="text-sm text-foreground-muted">No links yet.</p>
        ) : null}
        <div className="space-y-3">
          {data.links.map((link, index) => (
            <div
              key={index}
              className="grid gap-3 border border-border bg-background-elevated p-3 sm:grid-cols-[1fr_1.4fr_auto]"
            >
              <Input
                placeholder="Button label (e.g. Get on Gumroad)"
                value={link.label}
                onChange={(e) => updateLink(index, { label: e.target.value })}
              />
              <Input
                type="url"
                placeholder="https://kahongames.gumroad.com/l/Ayumemo"
                value={link.href}
                onChange={(e) => updateLink(index, { href: e.target.value })}
              />
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => removeLink(index)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
        <Button type="button" size="sm" variant="secondary" onClick={addLink}>
          Add link
        </Button>
      </div>

      <label className="flex items-center gap-2 text-sm text-foreground-muted">
        <input
          type="checkbox"
          checked={data.featured}
          onChange={(e) => setData({ ...data, featured: e.target.checked })}
        />
        Featured on homepage
      </label>

      <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6">
        <Button type="button" onClick={save} disabled={status === "saving"}>
          {status === "saving"
            ? "Saving…"
            : isNew
              ? "Create project"
              : "Save project"}
        </Button>
        {!isNew ? (
          <Button type="button" variant="secondary" onClick={remove}>
            Delete
          </Button>
        ) : null}
        {status === "saved" ? (
          <p className="text-sm text-success">Saved.</p>
        ) : null}
        {error ? <p className="w-full text-sm text-danger">{error}</p> : null}
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
