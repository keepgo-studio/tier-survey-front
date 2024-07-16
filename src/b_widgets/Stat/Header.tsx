"use client";

import Entities from "@entities";
import Shared, { SharedUtils } from "@shared";
import Link from "next/link";
import React from "react";
import { StatProps } from "./Stat";
import { RiLogoutBoxLine } from "react-icons/ri";

export default function Header({ gameInfo, hashedId }: StatProps) {
  const dispath = Entities.hooks.useAppDispatch();
  const currentHashedId = Entities.hooks.useAppSelector(
    Entities.user.selectHashedId
  );
  const isHost = hashedId === currentHashedId;

  const signOut = () => {
    dispath(Entities.user.logout());
  };

  return (
    <div className="flex justify-between gap-4 flex-col-reverse sm:items-center sm:flex-row">
      <h1 className="capitalize text-lg sm:text-2xl">
        dashboard,{" "}
        <span
          style={{ color: gameInfo["theme-color"] }}
          className="whitespace-nowrap"
        >
          {gameInfo["game-name"]}
        </span>
      </h1>

      {isHost && (
        <div className="flex justify-end gap-2">
          <Shared.Button
            className="border border-border bg-dark !text-xs fcenter gap-2"
            onClick={signOut}
          >
            <RiLogoutBoxLine className="text-base text-red" />
            <span className="text-bright-gray">sign out</span>
          </Shared.Button>

          <Link href={SharedUtils.generateHostQRUrl(gameInfo["game-name"])}>
            <Shared.Button className="bg-purple !text-xs">
              설문 다시하기
            </Shared.Button>
          </Link>
        </div>
      )}
    </div>
  );
}
