import type { Metadata } from "next";
// import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://sangwaboi.me"), // Updated to custom domain
  title: "Vishvendra Sangwa's Space",
  description: "Vishvendra Sangwa's personal website and thoughts.",
  keywords: [
    "vishvendra",
    "sangwa",
    "vishvendra sangwa",
    "sangwaboi",
    "portfolio",
    "blog",
    "thoughts",
    "developer",
    "ai/ml",
    "robotics",
    "web3"
  ],
  openGraph: {
    title: "Vishvendra Sangwa's Space",
    url: "https://sangwaboi.me", // Updated to custom domain
    description: "Vishvendra Sangwa's personal website and thoughts.",
    // You can add an image here later if you want
    // images: [
    //   {
    //     url: "/og-image.png", 
    //     width: 800,
    //     height: 600,
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vishvendra Sangwa's Space",
    description: "Vishvendra Sangwa's personal website and thoughts.",
    creator: "@sangwaboii",
    // You can add an image here later
    // images: ["/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
