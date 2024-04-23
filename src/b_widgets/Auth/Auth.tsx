"use client";

import React from "react";
import Shared, { SharedUtils } from "@shared";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Auth() {
  const AUTH_PROVIDER = "https://auth.riotgames.com/authorize";

  const provider = useSearchParams().get("provider") ?? "";
  const previousPathname = useSearchParams().get("path") ?? "/";
  
  const callbackPath = "/api/oauth/rso/callback";

  if (provider === "riot") {
    return (
      <Link
        href={SharedUtils.getQuery(AUTH_PROVIDER, {
          redirect_uri: SharedUtils.NEXT_PROD_API_URL + callbackPath,
          client_id: process.env.NEXT_PUBLIC_CLIENT_ID ?? "",
          response_type: "code",
          scope: "openid",
          state: previousPathname,
        })}
      >
        <Shared.Button>Sign In</Shared.Button>
      </Link>
    );
  }
}