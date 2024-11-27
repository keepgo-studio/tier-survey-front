import React from "react";
import Shared, { SharedUtils } from "@shared";
import Link from "next/link";
import { IoLogIn } from "react-icons/io5";
import Image from "next/image";

export default function Auth({
  game,
  redirect,
}: {
  game: SupportGame;
  redirect?: string;
}) {
  const AUTH_PROVIDER = "https://auth.riotgames.com/authorize";

  const oauthCallback = "/api/oauth/rso/callback";

  switch (game) {
    case "league of legends":
    case "teamfight tactics":
    case "valorant":
      return (
        <Shared.Frame
          type="large"
          className="flex flex-col items-center gap-6 bg-black p-6 !w-fit"
        >
          <Image
            src="/data/img/riot-logo.png"
            width={80}
            height={80}
            alt="logo"
          />
          <Link
            className="block w-fit"
            href={SharedUtils.getQuery(AUTH_PROVIDER, {
              redirect_uri: SharedUtils.NEXT_PROD_API_URL + oauthCallback,
              client_id: process.env.NEXT_PUBLIC_CLIENT_ID ?? "",
              response_type: "code",
              scope: "openid",
              state: redirect ? redirect : window.location.href,
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
