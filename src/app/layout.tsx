import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Haem.io - Advanced Haematology Diagnostic Platform",
  description: "AI-powered diagnostic system for precise classification of haematologic disorders according to WHO 2022 and ICC 2022 guidelines.",
  keywords: "haematology, diagnostics, AI, WHO 2022, ICC 2022, blood disorders, medical technology",
  authors: [{ name: "Haem.io Team" }],
  openGraph: {
    title: "Haem.io - Advanced Haematology Diagnostic Platform",
    description: "AI-powered diagnostic system for precise classification of haematologic disorders",
    url: "https://haem.io",
    siteName: "Haem.io",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
