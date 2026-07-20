import type { Metadata } from "next";
import { Instrument_Serif, Geist } from "next/font/google";
import { getSite } from "@/lib/content";
import "./globals.css";

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const site = getSite();

export const metadata: Metadata = {
  metadataBase: new URL("https://jamesraphaelibay.com"),
  title: {
    default: `${site.screenName} · ${site.brandName} — Games & Software`,
    template: `%s · ${site.screenName}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.screenName} · ${site.brandName}`,
    description: site.description,
    type: "website",
    locale: "en_US",
    siteName: site.brandName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.screenName} · ${site.brandName}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
