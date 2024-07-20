"use client";

import Shared, { LeagueOfLegendsChart, SharedApi, SharedHooks, SharedUtils } from "@shared";
import React, { useEffect, useState } from "react";
import { StatProps } from "../../Stat";
import { colorArr, getChampionNameMap, getMaxTiers, numberWithCommas, orderTier, TierTypes } from "./utils";
import Image from "next/image";
import { FaHeart } from "react-icons/fa6";
import TierD3 from "./TierD3";

export default function Chart({ gameInfo, hashedId }: StatProps) {
  const [data, setData] = useState<LeagueOfLegendsChart | null>(null);

  useEffect(() => {
    SharedApi.query("getChart", gameInfo["game-name"], { hashedId })
      .then((_data) => {
        if (_data) setData(_data);
      })
      .finally();
  }, [gameInfo, hashedId]);

  if (!data)
    return (
      <div>
        <Shared.Spinner withText={false} />

        <div className="h-4" />

        <p className="text-lg text-bright-gray text-center">processing...</p>
      </div>
    );

  return (
    <div className="w-full flex flex-col gap-4">
      <section className="flex md:flex-row gap-2 items-stretch">
        <div className="grid grid-rows-2 gap-2">
          <Counts cnt={data.participantCnt} />
          <TotalLevel num={data.totalLevel} />
        </div>

        <div className="flex-1">
          <Champions champions={data.mostLovedChampionTop10} />
        </div>
      </section>

      <RankPie type="solo" data={data.tierCnt} />

      <RankPie type="flex" data={data.flexTierCnt} />

      <Leaderboards />

      <MyRanking />
    </div>
  );
}

function Counts({ cnt }: { cnt: number }) {
  return (
    <Shared.Frame className="!p-8 bg-dark flex flex-col">
      <h4 className="text-bright-gray uppercase">participants count</h4>
      <div className="h-4" />
      <span className="text-5xl flex-1 flex items-center">
        {numberWithCommas(cnt)}
      </span>
    </Shared.Frame>
  );
}

function TotalLevel({ num }: { num: number }) {
  return (
    <Shared.Frame className="!p-8 bg-dark flex flex-col">
      <h4 className="text-bright-gray uppercase">total level</h4>
      <div className="h-4" />
      <span className="text-5xl flex-1 flex items-center">
        {numberWithCommas(num)}
      </span>
    </Shared.Frame>
  );
}

function Champions({ champions }: { champions: [string, number][] }) {
  const [loading, setLoading] = useState(true);
  const [idNameMap, setIdNameMap] = useState<Record<string, string>>({});
  const { renderSlider } = SharedHooks.useSlider();

  useEffect(() => {
    getChampionNameMap()
      .then((data) => setIdNameMap(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Shared.Frame className="!p-8 bg-dark">
      <h4 className="text-bright-gray uppercase">most loved champions</h4>
      <div className="h-2" />

      <p className="text-sm">사람들이 많이 다룬 챔피언들입니다.</p>
      <div className="h-6" />

      <Shared.Frame className="bg-linear-black">
        {loading ? (
          <Shared.Spinner />
        ) : (
          <ul>
            {renderSlider(
              champions.map(([championId, cnt], idx) => (
                <li key={championId}>
                  <Shared.Frame className="relative h-60 aspect-square overflow-hidden">
                    <Image
                      draggable={false}
                      src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${idNameMap[championId]}_0.jpg`}
                      fill
                      alt="champion main image"
                      className="object-cover object-center"
                    />

                    <p className="absolute flex items-center gap-2 bottom-4 left-4 text-sm">
                      <FaHeart className="text-base text-red" />
                      {numberWithCommas(cnt)}
                    </p>

                    <h4 className="text-lg absolute top-3 left-4">
                      {idx + 1}
                      <span className="text-xs">th</span>
                    </h4>
                  </Shared.Frame>
                </li>
              ))
            )}
          </ul>
        )}
      </Shared.Frame>
    </Shared.Frame>
  );
}

function RankPie({
  type,
  data,
}: {
  type: "solo" | "flex";
  data: Record<TierTypes, number>;
}) {
  const total = SharedUtils.sum(Object.values(data));
  const maxTierArr = getMaxTiers(data);
  const [focusTier, setFocusTier] = useState<TierTypes | null>(null);

  return (
    <Shared.Frame className="!p-8 bg-dark">
      <h4 className="text-bright-gray uppercase">{type} rank</h4>
      
      <div className="h-6" />

      <div className="text-sm">
        <p>유저들의 {type === "solo" ? "솔로" : "자유"} 랭크 티어 분포표입니다.</p>
        
        <div className="h-2"/>

        {maxTierArr.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-[1em] bg-purple"/>
            <p>현재 <span className="font-bold text-lg">{maxTierArr.join(", ")}</span> 티어가 가장 많습니다.</p>
          </div>
        )}
      </div>
      
      <div className="h-6" />

      <TierD3 data={data} onFocus={(_t) => setFocusTier(_t)} />

      <div className="h-8" />

      <ul className="m-auto max-w-4xl flex items-center flex-wrap gap-x-4 gap-y-1">
      {orderTier.map((_tier, idx) => (
        <li key={_tier} className={"flex gap-3 duration-default py-4 px-5 rounded-lg " + " " + `
          ${data[_tier] > 0 && "hover:shadow-border"}
          ${focusTier === _tier && "shadow-border"}
        `}>
          <i className="block w-3 h-3 rounded-full mt-[2px]" style={{ backgroundColor: colorArr[idx]}}/>
          
          <div className={data[_tier] === 0 ? "brightness-50" : ""}>
            <p className="text-xs">{_tier}</p>
            <p>
              <span className="text-xl">{data[_tier]}</span> <span className="text-bright-gray text-xs">({(data[_tier] / total * 100).toFixed(1)}%)</span>
            </p>
          </div>
        </li>
      ))}
      </ul>
    </Shared.Frame>
  );
}

function Leaderboards() {
  return (
    <Shared.Frame className="!p-8 bg-dark">
      <h4 className="text-bright-gray uppercase">top 100</h4>
      
      <div className="h-6" />

      <p>현재 설문의 상위 100명 플레이어 정보입니다.</p>
    </Shared.Frame>
  );
}

function MyRanking() {
  return (
    <Shared.Frame className="!p-8 bg-dark">
      <h4 className="text-bright-gray uppercase">my ranking</h4>
      
      <div className="h-6" />

      <p>
        설문에서의 내 순위

        <br />

        <span className="text-sm text-bright-gray">이 순위는 나만 볼 수 있습니다.</span>
      </p>
      
    </Shared.Frame>
  );
}
