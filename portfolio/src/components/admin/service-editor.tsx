"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export type ServiceFormValues = {
  id: string;
  title: string;
  description: string;
  deliverablesText: string;
  idealFor: string;
};

type ServiceEditorProps = {
  mode: "create" | "edit";
  initial: ServiceFormValues;
};

export function ServiceEditor({ mode, initial }: ServiceEditorProps) {
  const router = useRouter();
  const [data, setData] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const payload = useMemo(
    () => ({
      id: data.id,
      title: data.title,
      description: data.description,
      deliverables: data.deliverablesText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      idealFor: data.idealFor,
    }),
    [data],
  );

  async function save() {
    setStatus("saving");
    setError(null);
    const res = await fetch(
      mode === "create" ? "/api/cms/services" : `/api/cms/services/${initial.id}`,
      {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as { error?: string } | null;
      setStatus("error");
      setError(body?.error ?? "Save failed.");
      return;
    }
    router.push("/tagapangasiwa/services");
    router.refresh();
  }

  async function remove() {
    if (mode !== "edit") return;
    if (!confirm("Delete this service?")) return;
    const res = await fetch(`/api/cms/services/${initial.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      setError("Delete failed.");
      return;
    }
    router.push("/tagapangasiwa/services");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Id (slug)</Label>
          <Input
            value={data.id}
            disabled={mode === "edit"}
            onChange={(e) => setData({ ...data, id: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label>Deliverables (one per line)</Label>
        <Textarea
          value={data.deliverablesText}
          onChange={(e) =>
            setData({ ...data, deliverablesText: e.target.value })
          }
        />
      </div>
      <div className="space-y-2">
        <Label>Ideal for</Label>
        <Input
          value={data.idealFor}
          onChange={(e) => setData({ ...data, idealFor: e.target.value })}
        />
      </div>
      <div className="flex flex-wrap gap-3 border-t border-border pt-6">
        <Button type="button" onClick={save} disabled={status === "saving"}>
          {status === "saving" ? "Saving…" : "Save service"}
        </Button>
        {mode === "edit" ? (
          <Button type="button" variant="secondary" onClick={remove}>
            Delete
          </Button>
        ) : null}
        {error ? <p className="w-full text-sm text-danger">{error}</p> : null}
      </div>
    </div>
  );
}
