import "./globals.css";

import { Inter } from "next/font/google";
import Shared from "@shared";

import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tier Survey",
  description: "Tier Survey Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className + " h-screen grid grid-rows-[1fr_auto]"}>
      {children}
      <Shared.Footer />
      </body>
    </html>
  );
}
