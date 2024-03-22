import "./globals.css";

import { Inter } from "next/font/google";
import Shared from "@shared";

import type { Metadata } from "next";
import Entities from "@entities";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Tier Survey",
  description: "Tier Survey Website",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className + " h-screen grid grid-rows-[auto_1fr_auto]"}>
        <Shared.Navbar />
        <Entities.Provider>
        {children}
        </Entities.Provider>
        <Shared.Footer />
      </body>
    </html>
  );
}
