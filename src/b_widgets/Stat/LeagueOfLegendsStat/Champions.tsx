"use client";

import React, { useEffect, useState } from "react";
import {
  SharedApi,
  type LeagueOfLegendsChampionInfo,
  SharedHooks,
} from "@shared";
import Image from "next/image";

async function getChampionName(championId: number) {
  const championMap = await fetch("/data/champion-map.json").then(res => res.json());

  return championMap[championId];
}

type ChampionInfo = LeagueOfLegendsChampionInfo & {
  championName: string;
};

export default function Champions({ hashedId }: { hashedId: string }) {
  const [championList, setChampionList] = useState<ChampionInfo[]>([]);

  useEffect(() => {
    SharedApi.query("get-stat", "league of legends", {
      hashedId,
    }).then(async (stat) => {
      if (!stat) return;

      const data = await Promise.all(
        stat.champions.map(async (list) => {
          const championName = await getChampionName(list.championId);

          return {
            championName,
            ...list,
          } as ChampionInfo;
        })
      );

      setChampionList(data);
    });
  }, [hashedId]);

  const { renderSlider } = SharedHooks.useSlider();

  return (
    <div className="bg-black">
      <ul className="w-full">
        {renderSlider(
          championList.map((info) => (
            <li
              key={info.championId}
              className="relative aspect-video min-h-80"
            >
              <Image
                draggable={false}
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${info.championName}_0.jpg`}
                fill
                alt="champion main image"
                className="object-cover object-[0_15%]"
              />
              
              <p className="absolute right-2 bottom-2 text-white text-xl font-bold">
              {info.championName} / {info.championLevel} / {info.championPoints}
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
