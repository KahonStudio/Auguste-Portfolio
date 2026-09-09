"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export type ExperienceFormValues = {
  id: string;
  org: string;
  role: string;
  period: string;
  summary: string;
};

type ExperienceEditorProps = {
  mode: "create" | "edit";
  initial: ExperienceFormValues;
};

export function ExperienceEditor({ mode, initial }: ExperienceEditorProps) {
  const router = useRouter();
  const [data, setData] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function save() {
    setStatus("saving");
    setError(null);
    const res = await fetch(
      mode === "create"
        ? "/api/cms/experience"
        : `/api/cms/experience/${initial.id}`,
      {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as { error?: string } | null;
      setStatus("error");
      setError(body?.error ?? "Save failed.");
      return;
    }
    setStatus("idle");
    if (mode === "create") {
      setData({ id: "", org: "", role: "", period: "", summary: "" });
    }
    router.refresh();
  }

  async function remove() {
    if (mode !== "edit") return;
    if (!confirm("Delete this experience entry?")) return;
    const res = await fetch(`/api/cms/experience/${initial.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      setError("Delete failed.");
      return;
    }
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
          <Label>Period</Label>
          <Input
            value={data.period}
            onChange={(e) => setData({ ...data, period: e.target.value })}
            placeholder="2023 — Present"
          />
        </div>
        <div className="space-y-2">
          <Label>Organization</Label>
          <Input
            value={data.org}
            onChange={(e) => setData({ ...data, org: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Role</Label>
          <Input
            value={data.role}
            onChange={(e) => setData({ ...data, role: e.target.value })}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Summary</Label>
        <Textarea
          value={data.summary}
          onChange={(e) => setData({ ...data, summary: e.target.value })}
          rows={4}
        />
      </div>
      <div className="flex flex-wrap gap-3 border-t border-border pt-6">
        <Button type="button" onClick={save} disabled={status === "saving"}>
          {status === "saving" ? "Saving…" : "Save entry"}
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
