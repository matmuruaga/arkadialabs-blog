import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const notoSans = Noto_Sans({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ArkadiaLabs Blog - Tecnología e Innovación",
  description: "Descubre las últimas tendencias en tecnología, desarrollo web, inteligencia artificial y más en el blog de ArkadiaLabs.",
  keywords: "tecnología, desarrollo web, inteligencia artificial, programación, innovación",
  authors: [{ name: "ArkadiaLabs" }],
  openGraph: {
    title: "ArkadiaLabs Blog",
    description: "Tecnología e Innovación",
    type: "website",
    locale: "es_ES",
    siteName: "ArkadiaLabs",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArkadiaLabs Blog",
    description: "Tecnología e Innovación",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${notoSans.variable} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
