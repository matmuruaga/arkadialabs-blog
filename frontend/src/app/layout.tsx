import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans",
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${notoSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
