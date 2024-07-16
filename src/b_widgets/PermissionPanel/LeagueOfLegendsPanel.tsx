"use client";

import React, { useState } from "react";
import Shared, { SharedApi, SharedUtils } from "@shared";
import Link from "next/link";
import { addLeaveBarrier, removeLeaveBarrier } from "./utils";

type Item = {
  apiType: SupportApiType;
  apiLink: string;
  types: string[];
};

export default function LeagueOfLegendsPanel({
  currentGame,
  hashedId,
  hostHashedId,
  open,
  onFinish
}: {
  currentGame: SupportGame;
  hashedId: string;
  hostHashedId: string;
  open: boolean;
  onFinish: () => void;
}) {
  const itemList: Item[] = [
    {
      apiType: "SUMMONER-V4",
      apiLink: "https://developer.riotgames.com/apis#summoner-v4",
      types: ["소환사 닉네임", "소환사 레벨"],
    },
    {
      apiType: "LEAGUE-V4",
      apiLink: "https://developer.riotgames.com/apis#league-v4",
      types: ["솔로 랭크 티어"],
    },
    {
      apiType: "CHAMPION-MASTERY-V4",
      apiLink: "https://developer.riotgames.com/apis#champion-mastery-v4",
      types: ["가장 많이 다룬 챔피언들 정보"],
    },
  ];

  const [loading, setLoading] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleJoin = async () => {
    setLoading(true);
    addLeaveBarrier();

    const joined = await SharedApi.query("check-join-survey", currentGame, {
      hashedId,
      hostHashedId,
    });

    setHasJoined(joined);

    await SharedUtils.delay(5000);

    const done = (err?: string) => {
      setError(err ? err : null);
      setLoading(false);
      removeLeaveBarrier();
    };

    if (!joined) {
      const results = await Promise.allSettled(
        itemList.map(({ apiType }) =>
          SharedApi.query("save-stat", currentGame, {
            apiType,
            hashedId,
            hostHashedId,
          })
        )
      );

      const isFulfilled = results.every((res) => res.status === "fulfilled");

      if (!isFulfilled) {
        done("서버에 문제가 생겼습니다, 잠시 후에 재시도 해주십시오");
        return;
      }

      if (results.some((res) => res.value.status === 404)) {
        done("에러가 생겼습니다, 정상적인 방법을 통해 참여 해주십시오");
        return;
      }

      const finalRes = await SharedApi.query("join-survey", currentGame, {
        hashedId,
        hostHashedId
      });

      if (!finalRes) {
        done("에러가 생겼습니다, 새로고침 해주십시오");
        return;
      }

      onFinish();
    }

    done();
  };

  const renderButtons = () => {
    if (!open) {
      return (
        <>
          <Link href={SharedUtils.generateStatUrl(hostHashedId, currentGame)}>
            <Shared.Button className="bg-blue">설문 보러 가기</Shared.Button>
          </Link>
          <Shared.Button disabled>이미 닫힌 설문입니다</Shared.Button>
        </>
      );
    }

    if (error) {
      return (
        <>
          <p className="text-red text-sm p-2">{error}</p>
        </>
      );
    }

    if (hasJoined) {
      return (
        <>
          <Link href={SharedUtils.generateStatUrl(hostHashedId, currentGame)}>
            <Shared.Button className="bg-blue">설문 보러 가기</Shared.Button>
          </Link>
          <Shared.Button disabled>이미 참여한 설문입니다</Shared.Button>
        </>
      );
    }

    return (
      <Shared.Button
        onClick={handleJoin}
        className="bg-purple"
        disabled={loading}
      >
        설문 참여하기
      </Shared.Button>
    );
  };

  return (
    <>
      <Shared.Frame className="p-7 bg-dark-black" type="large">
        <ul className="flex flex-col gap-6">
          {itemList.map((item, idx) => (
            <li key={idx}>
              <PanelItem {...item} />
            </li>
          ))}
        </ul>
      </Shared.Frame>

      <div className="h-8" />

      <div className="flex items-center justify-end gap-2">
        {renderButtons()}
      </div>
    </>
  );
}

function PanelItem({ apiType, apiLink, types }: Item) {
  return (
    <Shared.Frame className="px-3 py-6">
      <Link href={apiLink} target="_blank">
        <h4 className="clickable text-bright-gray px-1">{apiType}</h4>
      </Link>

      <div className="h-4" />

      <ul className="max-w-96 flex flex-col gap-2">
        {types.map((t) => (
          <li key={t} className="text-white">
            <Tooltip title={`host 에게 ${t} 정보 제공`}>
              <Shared.Frame
                type="small"
                className="bg-dimm-dark py-2 px-4 flex items-center w-full gap-2"
              >
                <i className="block w-1 h-1 bg-white rounded-full" />
                <span>{t}</span>
              </Shared.Frame>
            </Tooltip>
          </li>
        ))}
      </ul>
    </Shared.Frame>
  );
}

function Tooltip({
  children,
  title,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
}) {
  return (
    <div className="relative group">
      {children}

      <div className="w-max max-w-56 group-hover:visible group-hover:opacity-100 group-hover:-top-3 invisible opacity-0 -top-2 duration-150 absolute left-1/2 -translate-y-full -translate-x-1/2 bg-black text-xs py-[6px] px-3 rounded-md">
        <i className="block absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-black" />
        <span>{title}</span>
      </div>
    </div>
  );
}
