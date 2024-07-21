"use client";

import Entities from "@entities";
import Shared, { SharedUtils } from "@shared";
import Link from "next/link";
import React from "react";
import { StatProps } from "./Stat";
import Signout from "../Signout/Signout";

export default function Header({ gameInfo, hashedId }: StatProps) {
  const currentHashedIdMap = Entities.hooks.useAppSelector(
    Entities.user.selectHashedId
  );
  const currentHashedId = currentHashedIdMap[gameInfo["game-name"]];
  const isHost = hashedId === currentHashedId;

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

      <div className="flex justify-end gap-2">
        {currentHashedId && <Signout game={gameInfo["game-name"]} />}

        {isHost && (
          <Link href={SharedUtils.generateHostQRUrl(gameInfo["game-name"])}>
            <Shared.Button className="bg-purple !text-xs">
              설문 다시하기
            </Shared.Button>
          </Link>
        )}
      </div>
    </div>
  );
}
