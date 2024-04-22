"use client";

import React, { useEffect } from "react";
import Shared, { SharedApi, SharedUtils } from "@shared";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Entities from "@entities";

export default function AuthProvider({
  cookieHahsedId
}: {
  cookieHahsedId: string | null;
}) {
  const AUTH_PROVIDER = "https://auth.riotgames.com/authorize";

  const router = useRouter();
  const dispatch = Entities.hooks.useAppDispatch();
  const provider = useSearchParams().get("provider") ?? "";
  const previousPathname = useSearchParams().get("path") ?? "/";
  const pathname = usePathname();

  const callbackPath = "/api/oauth/rso/callback";
  const currentUrl = SharedUtils.getQuery(SharedUtils.NEXT_API_URL + pathname, {
    provider,
  });

  useEffect(() => {
    if (cookieHahsedId === null) {
      return;
    }

    SharedApi.query("get-user", "league of legends", {
      hashedId: cookieHahsedId
    }).then(res => {
      if (res) {
        dispatch(Entities.user.setHashedId(cookieHahsedId));
        router.replace(previousPathname);
      }
    });

  }, [router, dispatch, previousPathname, cookieHahsedId]);

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