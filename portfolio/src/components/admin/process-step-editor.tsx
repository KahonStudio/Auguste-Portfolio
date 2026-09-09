"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export type ProcessStepFormValues = {
  id: string;
  title: string;
  description: string;
};

type ProcessStepEditorProps = {
  mode: "create" | "edit";
  initial: ProcessStepFormValues;
  /** e.g. /api/cms/commission-process */
  apiBase: string;
  saveLabel?: string;
};

export function ProcessStepEditor({
  mode,
  initial,
  apiBase,
  saveLabel = "Save step",
}: ProcessStepEditorProps) {
  const router = useRouter();
  const [data, setData] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function save() {
    setStatus("saving");
    setError(null);
    const res = await fetch(
      mode === "create" ? apiBase : `${apiBase}/${initial.id}`,
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
      setData({ id: "", title: "", description: "" });
    }
    router.refresh();
  }

  async function remove() {
    if (mode !== "edit") return;
    if (!confirm("Delete this step?")) return;
    const res = await fetch(`${apiBase}/${initial.id}`, { method: "DELETE" });
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
          rows={4}
        />
      </div>
      <div className="flex flex-wrap gap-3 border-t border-border pt-6">
        <Button type="button" onClick={save} disabled={status === "saving"}>
          {status === "saving" ? "Saving…" : saveLabel}
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
