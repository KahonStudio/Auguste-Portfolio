"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  commissionSchema,
  type CommissionInput,
} from "@/lib/validations/forms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function CommissionForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommissionInput>({
    resolver: zodResolver(commissionSchema),
    defaultValues: { type: "commission" },
  });

  async function onSubmit(data: CommissionInput) {
    setStatus("loading");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(body?.error ?? "Something went wrong.");
      }
      setStatus("success");
      reset({ type: "commission" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Unable to send inquiry.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className="border border-border bg-background-elevated p-8"
        role="status"
      >
        <h3 className="font-display text-2xl text-foreground">Inquiry received</h3>
        <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
          Thank you. I will review your brief and reply with fit, clarifying
          questions, and next steps. Payment is discussed after we agree on
          scope — not before.
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Send another inquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="commission-name">Name</Label>
          <Input id="commission-name" autoComplete="name" {...register("name")} />
          {errors.name ? (
            <p className="text-xs text-danger">{errors.name.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="commission-email">Email</Label>
          <Input
            id="commission-email"
            type="email"
            autoComplete="email"
            {...register("email")}
          />
          {errors.email ? (
            <p className="text-xs text-danger">{errors.email.message}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="projectType">Project type</Label>
          <select
            id="projectType"
            className="flex h-11 w-full border border-border bg-background-elevated px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            {...register("projectType")}
            defaultValue=""
          >
            <option value="" disabled>
              Select type
            </option>
            <option value="game">Game</option>
            <option value="software">Software</option>
            <option value="art">Art</option>
            <option value="other">Other</option>
          </select>
          {errors.projectType ? (
            <p className="text-xs text-danger">{errors.projectType.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="budgetRange">Budget range</Label>
          <select
            id="budgetRange"
            className="flex h-11 w-full border border-border bg-background-elevated px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            {...register("budgetRange")}
            defaultValue=""
          >
            <option value="" disabled>
              Select range
            </option>
            <option value="under-1k">Under $1k</option>
            <option value="1k-5k">$1k – $5k</option>
            <option value="5k-15k">$5k – $15k</option>
            <option value="15k-plus">$15k+</option>
            <option value="undecided">Not sure yet</option>
          </select>
          {errors.budgetRange ? (
            <p className="text-xs text-danger">{errors.budgetRange.message}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="deadline">Target deadline (optional)</Label>
        <Input id="deadline" placeholder="e.g. End of Q3" {...register("deadline")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="brief">Project brief</Label>
        <Textarea
          id="brief"
          placeholder="What you need, platform/engine, references, and constraints."
          {...register("brief")}
        />
        {errors.brief ? (
          <p className="text-xs text-danger">{errors.brief.message}</p>
        ) : null}
      </div>

      {status === "error" && errorMessage ? (
        <p className="text-sm text-danger" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send commission inquiry"}
      </Button>
    </form>
  );
}
