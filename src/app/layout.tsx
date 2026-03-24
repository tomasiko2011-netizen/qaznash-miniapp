import type { Metadata } from "next";
import { Manrope, Bitter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

const bitter = Bitter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "QazNash Mini App",
  description: "Витрина и demo-flow для отчетов по рынку Казахстана.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={`${manrope.variable} ${bitter.variable}`}>{children}</body>
    </html>
  );
}
