import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { LoginForm } from "@/components/admin/login-form";

export const metadata = {
  title: "Tagapangasiwa — Sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/tagapangasiwa");

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-accent">
        Tagapangasiwa
      </p>
      <h1 className="mt-3 font-display text-4xl text-foreground">Sign in</h1>
      <p className="mt-3 text-sm text-foreground-muted">
        Content desk for site copy, projects, and media.
      </p>
      <div className="mt-10 border border-border bg-background-elevated p-6">
        <LoginForm />
      </div>
    </div>
  );
}
