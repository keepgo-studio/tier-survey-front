import "./globals.css";

import Shared, { SharedFonts, SharedNodeUtils } from "@shared";
import Entities from "@entities";
import { cookies } from "next/headers";

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
      <body className={SharedFonts.LexendMega.className}>
        <Shared.LoadingBar />

        <Entities.Provider user={{ hashedId }}>
          <main className="bg-prime-dark text-prime-white h-screen grid grid-rows-[auto_1fr_auto]">
            <Shared.Navbar />
            <div className={SharedFonts.Jua.className}>{children}</div>
            <Shared.Footer />
          </main>
        </Entities.Provider>
      </body>
    </html>
  );
}
