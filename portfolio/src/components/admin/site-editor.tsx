"use client";

import { useState } from "react";
import type { SiteContent } from "@/types";
import { MediaUrlField } from "@/components/admin/media-fields";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type SiteEditorProps = {
  initial: SiteContent;
};

export function SiteEditor({ initial }: SiteEditorProps) {
  const [data, setData] = useState(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function save() {
    setStatus("saving");
    setError(null);
    const payload = {
      ...data,
      socials: data.socials.filter((s) => s.label.trim() && s.href.trim()),
    };
    const res = await fetch("/api/cms/site", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as { error?: string } | null;
      setStatus("error");
      setError(body?.error ?? "Save failed.");
      return;
    }
    const next = (await res.json()) as SiteContent;
    setData(next);
    setStatus("saved");
  }

  return (
    <div className="space-y-10">
      <section className="space-y-4 border-t border-border pt-8">
        <h2 className="font-display text-2xl text-foreground">Identity</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Brand name">
            <Input
              value={data.brandName}
              onChange={(e) => setData({ ...data, brandName: e.target.value })}
            />
          </Field>
          <Field label="Screen name">
            <Input
              value={data.screenName}
              onChange={(e) => setData({ ...data, screenName: e.target.value })}
            />
          </Field>
          <Field label="Email">
            <Input
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </Field>
          <Field label="Location">
            <Input
              value={data.location}
              onChange={(e) => setData({ ...data, location: e.target.value })}
            />
          </Field>
          <Field label="Tagline" className="sm:col-span-2">
            <Input
              value={data.tagline}
              onChange={(e) => setData({ ...data, tagline: e.target.value })}
            />
          </Field>
          <Field label="Site description" className="sm:col-span-2">
            <Textarea
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
            />
          </Field>
        </div>
        <div className="pt-2">
          <MediaUrlField
            label="Portrait image"
            value={data.portraitImage}
            accept="image/*"
            hint="Used as the hero poster / about portrait."
            onChange={(portraitImage) => setData({ ...data, portraitImage })}
          />
        </div>
      </section>

      <section className="space-y-4 border-t border-border pt-8">
        <h2 className="font-display text-2xl text-foreground">Hero</h2>
        <div className="grid gap-4">
          <Field label="Headline">
            <Input
              value={data.hero.headline}
              onChange={(e) =>
                setData({
                  ...data,
                  hero: { ...data.hero, headline: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Supporting">
            <Textarea
              value={data.hero.supporting}
              onChange={(e) =>
                setData({
                  ...data,
                  hero: { ...data.hero, supporting: e.target.value },
                })
              }
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Primary CTA label">
              <Input
                value={data.hero.primaryCta.label}
                onChange={(e) =>
                  setData({
                    ...data,
                    hero: {
                      ...data.hero,
                      primaryCta: {
                        ...data.hero.primaryCta,
                        label: e.target.value,
                      },
                    },
                  })
                }
              />
            </Field>
            <Field label="Primary CTA href">
              <Input
                value={data.hero.primaryCta.href}
                onChange={(e) =>
                  setData({
                    ...data,
                    hero: {
                      ...data.hero,
                      primaryCta: {
                        ...data.hero.primaryCta,
                        href: e.target.value,
                      },
                    },
                  })
                }
              />
            </Field>
            <Field label="Secondary CTA label">
              <Input
                value={data.hero.secondaryCta.label}
                onChange={(e) =>
                  setData({
                    ...data,
                    hero: {
                      ...data.hero,
                      secondaryCta: {
                        ...data.hero.secondaryCta,
                        label: e.target.value,
                      },
                    },
                  })
                }
              />
            </Field>
            <Field label="Secondary CTA href">
              <Input
                value={data.hero.secondaryCta.href}
                onChange={(e) =>
                  setData({
                    ...data,
                    hero: {
                      ...data.hero,
                      secondaryCta: {
                        ...data.hero.secondaryCta,
                        href: e.target.value,
                      },
                    },
                  })
                }
              />
            </Field>
          </div>
          <MediaUrlField
            label="Background video"
            value={data.hero.backgroundVideoUrl}
            accept="video/*"
            hint="Short muted loop for the homepage hero. Leave empty for still image only."
            onChange={(backgroundVideoUrl) =>
              setData({
                ...data,
                hero: { ...data.hero, backgroundVideoUrl },
              })
            }
          />
          <Field label="Watch reel YouTube URL">
            <Input
              value={data.hero.reelYoutubeUrl}
              placeholder="https://www.youtube.com/watch?v=…"
              onChange={(e) =>
                setData({
                  ...data,
                  hero: { ...data.hero, reelYoutubeUrl: e.target.value },
                })
              }
            />
          </Field>
        </div>
      </section>

      <section className="space-y-4 border-t border-border pt-8">
        <h2 className="font-display text-2xl text-foreground">About</h2>
        <Field label="About headline">
          <Input
            value={data.about.headline}
            onChange={(e) =>
              setData({
                ...data,
                about: { ...data.about, headline: e.target.value },
              })
            }
          />
        </Field>
        <Field label="About paragraphs (blank line between paragraphs)">
          <Textarea
            className="min-h-40"
            value={data.about.paragraphs.join("\n\n")}
            onChange={(e) =>
              setData({
                ...data,
                about: {
                  ...data.about,
                  paragraphs: e.target.value
                    .split(/\n\s*\n/)
                    .map((p) => p.trim())
                    .filter(Boolean),
                },
              })
            }
          />
        </Field>
      </section>

      <section className="space-y-4 border-t border-border pt-8">
        <h2 className="font-display text-2xl text-foreground">Elsewhere (footer)</h2>
        <p className="text-xs text-foreground-subtle">
          Social links shown in the site footer. Remove a row to hide it.
        </p>
        <div className="space-y-3">
          {data.socials.map((social, index) => (
            <div
              key={index}
              className="grid gap-3 border border-border bg-background-elevated p-3 sm:grid-cols-[1fr_1.4fr_auto]"
            >
              <Input
                placeholder="Label (e.g. LinkedIn)"
                value={social.label}
                onChange={(e) => {
                  const socials = data.socials.map((s, i) =>
                    i === index ? { ...s, label: e.target.value } : s,
                  );
                  setData({ ...data, socials });
                }}
              />
              <Input
                type="url"
                placeholder="https://…"
                value={social.href}
                onChange={(e) => {
                  const socials = data.socials.map((s, i) =>
                    i === index ? { ...s, href: e.target.value } : s,
                  );
                  setData({ ...data, socials });
                }}
              />
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() =>
                  setData({
                    ...data,
                    socials: data.socials.filter((_, i) => i !== index),
                  })
                }
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={() =>
            setData({
              ...data,
              socials: [...data.socials, { label: "", href: "" }],
            })
          }
        >
          Add link
        </Button>
      </section>

      <div className="flex flex-wrap items-center gap-4 border-t border-border pt-8">
        <Button type="button" size="lg" onClick={save} disabled={status === "saving"}>
          {status === "saving" ? "Saving…" : "Save site content"}
        </Button>
        {status === "saved" ? (
          <p className="text-sm text-success">Saved. Check the public homepage.</p>
        ) : null}
        {error ? <p className="text-sm text-danger">{error}</p> : null}
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}
