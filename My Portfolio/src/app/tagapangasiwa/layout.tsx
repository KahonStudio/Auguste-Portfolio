import { AdminProviders } from "@/components/admin/providers";

export default function TagapangasiwaRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminProviders>{children}</AdminProviders>;
}
