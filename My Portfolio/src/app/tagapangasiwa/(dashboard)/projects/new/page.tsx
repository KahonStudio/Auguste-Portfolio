import {
  ProjectEditor,
  type ProjectFormValues,
} from "@/components/admin/project-editor";

const blank: ProjectFormValues = {
  slug: "",
  title: "",
  role: "",
  summary: "",
  description: "",
  outcomesText: "",
  images: [],
  coverImage: "",
  year: new Date().getFullYear(),
  tagsText: "",
  links: [],
  featured: false,
};

export const metadata = {
  title: "New project — Tagapangasiwa",
  robots: { index: false, follow: false },
};

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl text-foreground">New project</h1>
      <ProjectEditor initial={blank} />
    </div>
  );
}
