"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export type FaqFormValues = {
  id: string;
  question: string;
  answer: string;
};

type FaqEditorProps = {
  mode: "create" | "edit";
  initial: FaqFormValues;
};

export function FaqEditor({ mode, initial }: FaqEditorProps) {
  const router = useRouter();
  const [data, setData] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function save() {
    setStatus("saving");
    setError(null);
    const res = await fetch(
      mode === "create"
        ? "/api/cms/commission-faqs"
        : `/api/cms/commission-faqs/${initial.id}`,
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
      setData({ id: "", question: "", answer: "" });
    }
    router.refresh();
  }

  async function remove() {
    if (mode !== "edit") return;
    if (!confirm("Delete this FAQ?")) return;
    const res = await fetch(`/api/cms/commission-faqs/${initial.id}`, {
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
      <div className="space-y-2">
        <Label>Id (slug)</Label>
        <Input
          value={data.id}
          disabled={mode === "edit"}
          onChange={(e) => setData({ ...data, id: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label>Question</Label>
        <Input
          value={data.question}
          onChange={(e) => setData({ ...data, question: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label>Answer</Label>
        <Textarea
          value={data.answer}
          onChange={(e) => setData({ ...data, answer: e.target.value })}
          rows={5}
        />
      </div>
      <div className="flex flex-wrap gap-3 border-t border-border pt-6">
        <Button type="button" onClick={save} disabled={status === "saving"}>
          {status === "saving" ? "Saving…" : "Save FAQ"}
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
