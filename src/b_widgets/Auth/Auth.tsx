"use client";

import React from "react";
import Shared, { SharedUtils } from "@shared";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { IoLogIn } from "react-icons/io5";
import Image from "next/image";

export default function Auth() {
  const AUTH_PROVIDER = "https://auth.riotgames.com/authorize";

  const provider = useSearchParams().get("provider") ?? "";
  const previousPathname = useSearchParams().get("path") ?? "/";

  const callbackPath = "/api/oauth/rso/callback";

  if (provider === "riot") {
    return (
      <Shared.Frame type="large" className="flex flex-col items-center gap-10 bg-black p-8">
        <Image src="/data/img/riot-logo.png" width={80} height={80} alt="logo" />

        <Link
          className="block w-fit"
          href={SharedUtils.getQuery(AUTH_PROVIDER, {
            redirect_uri: SharedUtils.NEXT_PROD_API_URL + callbackPath,
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID ?? "",
            response_type: "code",
            scope: "openid",
            state: previousPathname,
          })}
        >
          <Shared.Frame className="flex items-center gap-4 px-4 py-2 text-xs bg-dark-black clickable">
            <p className="uppercase">request sign in</p>
            <div className="text-white bg-riot p-2 text-lg rounded-lg">
              <IoLogIn />
            </div>
          </Shared.Frame>
        </Link>
      </Shared.Frame>
    );
  }
}
