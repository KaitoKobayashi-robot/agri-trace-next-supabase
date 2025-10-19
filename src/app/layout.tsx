import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { url } from "inspector";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://{process.env.VERCEL_URL}`
      : "http://localhost:3000"
  ),
  title: "AgriTrace",
  description:
    "AgriTraceは圃場に設置されたセンサから移動軌跡を取得するアプリケーションです",
  openGraph: {
    title: "AgriTrace",
    description:
      "AgriTraceは圃場に設置されたセンサから移動軌跡を取得するアプリケーションです",
    images: "/AgriTrace_ogp.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
