import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: {
    default: "CTD Conciergerie Premium",
    template: "%s | CTD Conciergerie Premium"
  },
  description:
    "Conciergerie de luxe sur la Côte d'Azur. Packs séjour, véhicules premium, activités privées et finalisation sécurisée.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://ctd-conciergerie.example"),
  openGraph: {
    title: "CTD Conciergerie Premium",
    description: "Expériences privées sur la Côte d'Azur.",
    images: ["/images/cannes/cannes-01.jpg"],
    locale: "fr_FR",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
