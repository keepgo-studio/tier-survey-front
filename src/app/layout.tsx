import "./globals.css";

import Shared, { SharedFonts, SharedNodeUtils, SharedUtils } from "@shared";
import Entities from "@entities";
import { cookies } from "next/headers";
import { Analytics } from "@vercel/analytics/react"

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

  const initHashedId: { [key in SupportGame]: string | null; } = {
    "league of legends": null,
    "teamfight tactics": null,
    valorant: null
  };
  
  SharedUtils.OAUTH_COOKIE.forEach(({ game, cookieKey }) => {
    const id = SharedNodeUtils.decrypt(cookieStore.get(cookieKey)?.value ?? "");

    initHashedId[game] = id;
  });

  return (
    <html lang="ko">
      <body className={SharedFonts.LexendMega.className + " " + "overflow-x-hidden"}>
        <Shared.LoadingBar />

        <Entities.Provider user={{ 
          hashedId: { ...initHashedId }
         }}>
          <main className="w-screen h-screen bg-black text-white relative p-2 overflow-x-hidden overflow-y-auto">
            <Shared.Frame className="min-h-full !p-0 rounded-[28px] bg-linear-black flex-1 relative flex flex-col">
              <Shared.Navbar />
              <div className="flex-1 grid grid-rows-1 justify-items-stretch items-stretch">{children}</div>
              <Shared.Footer />
            </Shared.Frame>
          </main>

        </Entities.Provider>

        <Analytics />
      </body>
    </html>
  );
}
