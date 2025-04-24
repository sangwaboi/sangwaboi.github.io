import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "arman's living room",
  description: "arman's living room",
  keywords: [
    "arman",
    "kumaraswamy",
    "arman kumaraswamy",
    "arman's living room",
    "armank",
    "armank.dev",
    "armank dev",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="bg-[#0f0f0f]" lang="en">
      <body className={geistMono.className}>{children}</body>
    </html>
  );
}
