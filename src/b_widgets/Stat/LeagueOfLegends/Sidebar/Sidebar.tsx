"use client"

import React from "react";
import Shared from "@shared";
import GameList from "./GameList";
import PersonalTier from "./PersonalTier";
import { StatProps } from "../../Stat";

export default function Sidebar(props: StatProps) {
  return (
    <div>
      <h4 className="uppercase font-light text-xs text-bright-gray mb-3">
        host info.
      </h4>

      <Shared.HostInfo {...props} />

      <div className="h-4"/>

      <GameList {...props} />

      <div className="h-4"/>

      <PersonalTier {...props} />
    </div>
  );
}

