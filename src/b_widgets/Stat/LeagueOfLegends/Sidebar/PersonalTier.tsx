"use client";

import Shared, { GameStat, SharedApi } from "@shared";
import React, { useEffect, useState } from "react";
import { StatProps } from "../../Stat";
import Image from "next/image";
import { generateTierRank } from "../utils";

export default function PersonalTier({ gameInfo, hashedId }: StatProps) {
  const [loading, setLoading] = useState(true);
  const [stat, setStat] = useState<GameStat | null>(null);

  useEffect(() => {
    setLoading(true);
    SharedApi.query("get-stat", gameInfo["game-name"], { hashedId })
      .then((data) => {
        if (!data) return;
        setStat(data);
      })
      .finally(() => setLoading(false));
  }, [gameInfo, hashedId]);

  return (
    <Shared.Frame className="!p-4 bg-dark-black flex flex-col gap-2">
      {(loading || stat === null) ? <Shared.Spinner /> : (
        <>
          <Update time={stat.updateTime} />
          <Level color={gameInfo["theme-color"]} level={stat.level}  />
          <Tier type="solo" numericTier={stat.tierNumeric}/>
          <Tier type="flex" numericTier={stat.flexTierNumeric}/>
        </>
      )}
    </Shared.Frame>
  );
}

function Update({ time }: { time: number }) {
  return (
    <div className="uppercase text-xs rounded-full border border-border py-2 px-3 text-bright-gray flex gap-2 justify-center">
      <span>updated at</span>
      {time && <span>{new Date(time).toISOString().slice(0, 10)}</span>}
    </div>
  );
}

function Level({ color, level }: { color: string; level: number; }) {
  return (
    <div className="p-2">
      <p className="text-lg" style={{ color }}>Lv.</p>

      <div className="h-1" />

      <h4 className="text-3xl">{level}</h4>
    </div>
  )
}

function Tier({ type, numericTier }: { type: "solo" | "flex"; numericTier: number; }) {
  const tier = generateTierRank(numericTier);

  return (
    <Shared.Frame className="!p-4 flex items-center justify-between">
      <div>
        <p className="uppercase text-xs text-bright-gray">{type} rank</p>

        <div className="h-1" />

        <p >{tier.tier}</p>
      </div>

      <Shared.Frame className="!w-fit bg-dark !p-[10px] fcenter">
        <Image
          src={`/data/ranked-emblems/league-of-legends/${tier.tier}.webp`}
          alt="tier-image"
          width={56}
          height={56}
        />
      </Shared.Frame>
    </Shared.Frame>
  )
}