import "./globals.css";

import Shared, { SharedFonts, SharedNodeUtils } from "@shared";
import Entities from "@entities";
import { cookies } from "next/headers";

import type { Metadata } from "next";

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
  const hashedId = SharedNodeUtils.decrypt(cookieStore.get("rso-hashed-id")?.value ?? "");

  return (
    <html lang="ko">
      <body className={SharedFonts.LexendMega.className + " " + "overflow-x-hidden"}>
        <Shared.LoadingBar />

        <Entities.Provider user={{ hashedId }}>
          <main className="w-screen h-screen bg-black text-white relative p-2 overflow-x-hidden overflow-y-auto">
            <Shared.Frame className="min-h-full !p-0 rounded-[28px] bg-linear-black flex-1 relative flex flex-col">
              <Shared.Navbar />
              <div className="flex-1 grid justify-items-stretch items-stretch">{children}</div>
              <Shared.Footer />
            </Shared.Frame>
          </main>

        </Entities.Provider>
      </body>
    </html>
  );
}
