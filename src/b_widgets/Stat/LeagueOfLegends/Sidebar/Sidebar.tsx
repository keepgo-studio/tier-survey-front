import React from "react";
import Shared from "@shared";
import GameList from "../../../GameList/GameList";
import PersonalTier from "./PersonalTier";
import { StatProps } from "../../Stat";

export default function Sidebar(props: StatProps) {
  return (
    <div className="grid sm:grid-rows-[auto_1fr] md:grid-cols-[auto_1fr] lg:flex lg:flex-col gap-4">
      <div>
        <h4 className="uppercase font-light text-xs text-bright-gray mb-2">
          host info.
        </h4>

        <Shared.HostInfo {...props} />
        <div className="h-4"/>

        <GameList hashedId={props.hashedId} init={props.gameInfo} />
      </div>

      <div>
        <h4 className="uppercase font-light text-xs text-bright-gray mb-2">
          my info.
        </h4>

        <PersonalTier {...props} />
      </div>
    </div>
  );
}

