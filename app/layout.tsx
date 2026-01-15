import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: "Harmoni Intim - Panduan Lengkap Hubungan Suami Istri",
  description: "Tingkatkan kualitas hubungan intim Anda dengan panduan praktis berbasis riset. Dapatkan tips stamina, teknik merangsang, dan cara mencapai kepuasan bersama.",
  keywords: "hubungan suami istri, tips pernikahan, intimasi, harmoni rumah tangga",
  openGraph: {
    title: "Harmoni Intim - Panduan Lengkap Hubungan Suami Istri",
    description: "Panduan praktis untuk meningkatkan kualitas hubungan intim dalam pernikahan",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
