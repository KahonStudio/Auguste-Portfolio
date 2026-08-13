import { NextResponse } from "next/server";
import {
  commissionSchema,
  contactSchema,
  type CommissionInput,
  type ContactInput,
} from "@/lib/validations/forms";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";

type InquiryPayload =
  | Omit<ContactInput, "website">
  | Omit<CommissionInput, "website">;

const projectTypeLabel: Record<CommissionInput["projectType"], string> = {
  game: "Game",
  software: "Software",
  art: "Art",
  other: "Other",
};

const budgetLabel: Record<CommissionInput["budgetRange"], string> = {
  "under-1k": "Under $1k",
  "1k-5k": "$1k – $5k",
  "5k-15k": "$5k – $15k",
  "15k-plus": "$15k+",
  undecided: "Not sure yet",
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function formatInquiryEmail(payload: InquiryPayload): {
  subject: string;
  text: string;
  html: string;
} {
  if (payload.type === "contact") {
    const subject = `[Contact] ${payload.subject}`;
    const text = [
      "New contact message",
      "",
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Subject: ${payload.subject}`,
      "",
      "Message:",
      payload.message,
    ].join("\n");

    const html = `
      <div style="font-family: system-ui, sans-serif; line-height: 1.5; color: #111;">
        <h2 style="margin: 0 0 16px;">New contact message</h2>
        <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
        <p style="margin: 0 0 8px;"><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        <p style="margin: 0 0 16px;"><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
        <p style="margin: 0 0 8px;"><strong>Message:</strong></p>
        <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(payload.message)}</p>
      </div>
    `.trim();

    return { subject, text, html };
  }

  const subject = `[Commission] ${projectTypeLabel[payload.projectType]} — ${payload.name}`;
  const deadline = payload.deadline?.trim() || "Not specified";
  const text = [
    "New commission inquiry",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Project type: ${projectTypeLabel[payload.projectType]}`,
    `Budget: ${budgetLabel[payload.budgetRange]}`,
    `Deadline: ${deadline}`,
    "",
    "Brief:",
    payload.brief,
  ].join("\n");

  const html = `
    <div style="font-family: system-ui, sans-serif; line-height: 1.5; color: #111;">
      <h2 style="margin: 0 0 16px;">New commission inquiry</h2>
      <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p style="margin: 0 0 8px;"><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p style="margin: 0 0 8px;"><strong>Project type:</strong> ${escapeHtml(projectTypeLabel[payload.projectType])}</p>
      <p style="margin: 0 0 8px;"><strong>Budget:</strong> ${escapeHtml(budgetLabel[payload.budgetRange])}</p>
      <p style="margin: 0 0 16px;"><strong>Deadline:</strong> ${escapeHtml(deadline)}</p>
      <p style="margin: 0 0 8px;"><strong>Brief:</strong></p>
      <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(payload.brief)}</p>
    </div>
  `.trim();

  return { subject, text, html };
}

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

  const ip = clientIp(request);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      {
        error:
          "Too many messages from this network. Please wait a bit and try again.",
      },
      { status: 429 },
    );
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

  const { website, ...payload } = parsed.data;

  // Honeypot filled → fake success, skip Resend
  if (website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim();
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL?.trim() || "onboarding@resend.dev";

  if (apiKey && toEmail) {
    try {
      const { subject, text, html } = formatInquiryEmail(payload);

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          reply_to: payload.email,
          subject,
          text,
          html,
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
    console.info("[contact]", payload);
  }

  return NextResponse.json({ ok: true });
}
