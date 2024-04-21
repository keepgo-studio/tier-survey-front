"use client";

import React from "react";
import Shared, { SharedUtils } from "@shared";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function AuthProvider() {
  const AUTH_PROVIDER = "https://auth.riotgames.com/authorize";

  const provider = useSearchParams().get("provider") ?? "";

  const pathname = usePathname();
  const callbackPath = "/api/oauth/rso/callback";
  const currentUrl = SharedUtils.getQuery(SharedUtils.NEXT_API_URL + pathname, {
    provider,
  });

  if (provider === "riot") {
    return (
      <Link
        href={SharedUtils.getQuery(AUTH_PROVIDER, {
          redirect_uri: SharedUtils.NEXT_PROD_API_URL + callbackPath,
          client_id: process.env.NEXT_PUBLIC_CLIENT_ID ?? "",
          response_type: "code",
          scope: "openid",
          state: currentUrl,
        })}
      >
        <Shared.Button>Sign In</Shared.Button>
      </Link>
    );
  }
}