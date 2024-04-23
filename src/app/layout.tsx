import "./globals.css";

import Shared, { SharedNodeUtils } from "@shared";
import Entities from "@entities";
import { cookies } from "next/headers";
import { inter } from "./fonts";

import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tier Survey",
  description: "Tier Survey Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const hashedId = SharedNodeUtils.decrypt(cookieStore.get("hashed-id")?.value ?? "");

  return (
    <html lang="ko">
      <body className={inter.className}>
        <main className="bg-prime-dark text-prime-white h-screen grid grid-rows-[auto_1fr_auto]">
          <Shared.Navbar />
          <Entities.Provider data={{ user: { hashedId }}}>
            <div>{children}</div>
          </Entities.Provider>
          <Shared.Footer />
        </main>
      </body>
    </html>
  );
}
