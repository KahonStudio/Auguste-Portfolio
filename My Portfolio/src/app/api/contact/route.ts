import { NextResponse } from "next/server";
import {
  commissionSchema,
  contactSchema,
} from "@/lib/validations/forms";

/**
 * Contact / commission intake.
 * Wire RESEND_API_KEY (+ CONTACT_TO_EMAIL) to send mail in production.
 * Payload shape is CMS/CRM-ready for future auth-gated dashboards.
 */
export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const type =
    typeof json === "object" && json !== null && "type" in json
      ? (json as { type?: string }).type
      : undefined;

  const parsed =
    type === "commission"
      ? commissionSchema.safeParse(json)
      : contactSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const payload = parsed.data;

  // Optional Resend integration
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (apiKey && toEmail) {
    try {
      const subject =
        payload.type === "commission"
          ? `[Commission] ${payload.projectType} — ${payload.name}`
          : `[Contact] ${payload.subject}`;

      const text = JSON.stringify(payload, null, 2);

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev",
          to: [toEmail],
          reply_to: payload.email,
          subject,
          text,
        }),
      });

      if (!res.ok) {
        console.error("Resend error", await res.text());
        return NextResponse.json(
          { error: "Unable to deliver message right now." },
          { status: 502 },
        );
      }
    } catch (err) {
      console.error("Mail send failed", err);
      return NextResponse.json(
        { error: "Unable to deliver message right now." },
        { status: 502 },
      );
    }
  } else {
    // Dev / unset provider: accept and log for local testing
    console.info("[contact]", payload);
  }

  return NextResponse.json({ ok: true });
}
