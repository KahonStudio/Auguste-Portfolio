import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaqEditor, type FaqFormValues } from "@/components/admin/faq-editor";
import {
  ProcessStepEditor,
  type ProcessStepFormValues,
} from "@/components/admin/process-step-editor";
import { mapFaq, mapProcessStep } from "@/lib/content/mappers";
import { isDatabaseConfigured, prisma } from "@/lib/prisma";

export const metadata = {
  title: "Commissions — Tagapangasiwa",
  robots: { index: false, follow: false },
};

const blankStep: ProcessStepFormValues = {
  id: "",
  title: "",
  description: "",
};

const blankFaq: FaqFormValues = {
  id: "",
  question: "",
  answer: "",
};

export default async function AdminCommissionsPage() {
  const db = isDatabaseConfigured();
  const [processRows, faqRows, workingRows] = db
    ? await Promise.all([
        prisma.commissionProcessStep.findMany({ orderBy: { sortOrder: "asc" } }),
        prisma.commissionFaq.findMany({ orderBy: { sortOrder: "asc" } }),
        prisma.workingWithMeStep.findMany({ orderBy: { sortOrder: "asc" } }),
      ])
    : [[], [], []];

  return (
    <div className="space-y-16">
      <div>
        <h1 className="font-display text-4xl text-foreground">Commissions</h1>
        <p className="mt-3 text-sm text-foreground-muted">
          Process steps, FAQs, and homepage “working with me” points.
        </p>
      </div>

      <section className="space-y-8">
        <div>
          <h2 className="font-display text-2xl text-foreground">
            Commission process
          </h2>
          <p className="mt-2 text-sm text-foreground-muted">
            Steps shown on the Commissions page.
          </p>
        </div>
        <ul className="divide-y divide-border border-t border-border">
          {processRows.map((row) => {
            const step = mapProcessStep(row);
            return (
              <li key={row.id} className="space-y-6 py-8">
                <div>
                  <p className="text-lg text-foreground">{step.title}</p>
                  <p className="text-xs text-foreground-subtle">{step.id}</p>
                </div>
                <ProcessStepEditor
                  mode="edit"
                  initial={step}
                  apiBase="/api/cms/commission-process"
                />
              </li>
            );
          })}
        </ul>
        <div className="space-y-4 border-t border-border pt-8">
          <h3 className="font-display text-xl text-foreground">Add process step</h3>
          <ProcessStepEditor
            mode="create"
            initial={blankStep}
            apiBase="/api/cms/commission-process"
          />
        </div>
      </section>

      <section className="space-y-8">
        <div>
          <h2 className="font-display text-2xl text-foreground">FAQs</h2>
          <p className="mt-2 text-sm text-foreground-muted">
            Questions on the Commissions page.
          </p>
        </div>
        <ul className="divide-y divide-border border-t border-border">
          {faqRows.map((row) => {
            const faq = mapFaq(row);
            return (
              <li key={row.id} className="space-y-6 py-8">
                <div>
                  <p className="text-lg text-foreground">{faq.question}</p>
                  <p className="text-xs text-foreground-subtle">{faq.id}</p>
                </div>
                <FaqEditor mode="edit" initial={faq} />
              </li>
            );
          })}
        </ul>
        <div className="space-y-4 border-t border-border pt-8">
          <h3 className="font-display text-xl text-foreground">Add FAQ</h3>
          <FaqEditor mode="create" initial={blankFaq} />
        </div>
      </section>

      <section className="space-y-8">
        <div>
          <h2 className="font-display text-2xl text-foreground">
            Working with me
          </h2>
          <p className="mt-2 text-sm text-foreground-muted">
            Short points on the homepage.
          </p>
        </div>
        <ul className="divide-y divide-border border-t border-border">
          {workingRows.map((row) => {
            const step = mapProcessStep(row);
            return (
              <li key={row.id} className="space-y-6 py-8">
                <div>
                  <p className="text-lg text-foreground">{step.title}</p>
                  <p className="text-xs text-foreground-subtle">{step.id}</p>
                </div>
                <ProcessStepEditor
                  mode="edit"
                  initial={step}
                  apiBase="/api/cms/working-with-me"
                />
              </li>
            );
          })}
        </ul>
        <div className="space-y-4 border-t border-border pt-8">
          <h3 className="font-display text-xl text-foreground">Add point</h3>
          <ProcessStepEditor
            mode="create"
            initial={blankStep}
            apiBase="/api/cms/working-with-me"
            saveLabel="Save point"
          />
        </div>
      </section>

      <Button asChild variant="secondary">
        <Link href="/commissions" target="_blank">
          Preview Commissions page
        </Link>
      </Button>
    </div>
  );
}
