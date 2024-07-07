"use client";

import React from "react";
import { SharedUtils } from "@shared";
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
      <div className="relative w-full h-full fcenter">
        <section className="bg-black text-white p-6 min-w-72 min-h-72 fcenter flex-col rounded-lg">
          <h2 className="text-xl fcenter gap-2">
            Sign In <Image src="/data/img/riot-logo.png" width={32} height={32} alt="logo"/>
          </h2>

          <div className="h-8"/>

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
            <div className="bg-riot rounded-lg w-fit p-4 text-2xl fcenter duration-default hover:brightness-75">
              <IoLogIn />
            </div>
          </Link>
        </section>
      </div>
    );
  }
}
