"use client";

import React, { useState } from "react";
import Link from "next/link";
import Shared, { SharedApi, SharedBrowserUtils, SharedUtils } from "@shared";
import { FaCheckCircle } from "react-icons/fa";
import { ImSpinner } from "react-icons/im";
import Entities from "@entities";
import Auth from "../Auth/Auth";
import { LeagueOfLegendsPermissions, type LeagueOfLegendsItem } from "./utils";
import Signout from "../Signout/Signout";

export default function LeagueOfLegendsPanel({
  currentGame,
  hostHashedId,
  open,
  onFinish,
}: {
  currentGame: SupportGame;
  hostHashedId: string;
  open: boolean;
  onFinish: () => void;
}) {
  const [itemList, setItemList] = useState<LeagueOfLegendsItem[]>([...LeagueOfLegendsPermissions]);

  const hashedIdMap = Entities.hooks.useAppSelector(Entities.user.selectHashedId);
  const hashedId = hashedIdMap["league of legends"];

  const [active, setActive] = useState(open);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleJoin = async () => {
    if (!hashedId) return;

    const done = (err?: string) => {
      setError(err ? err : null);
      setLoading(false);
      SharedBrowserUtils.removeLeaveBarrier();
    };

    setLoading(true);
    SharedBrowserUtils.addLeaveBarrier();

    const canAccess = await SharedApi.query("checkSurveyPassword", currentGame, { hostHashedId, password });

    if (canAccess === undefined) {
      done("설문을 확인하는데 오류가 생겼습니다.");
      return;
    } else if (canAccess.state === "closed") {
      setActive(false);
      done();
      return;
    } else if (canAccess.state === "wrong") {
      done("비밀번호가 틀렸습니다, host에게 물어보십시오");
      return;
    } 

    const joined = await SharedApi.query("checkJoinSurvey", currentGame, {
      hashedId,
      hostHashedId,
    });

    setHasJoined(joined);

    if (!joined) {
      setItemList(itemList.map(item => ({
        ...item,
        status: "loading"
      })));

      const results = await Promise.allSettled(
        itemList.map(async ({ apiType }, idx) => {
          const res = await SharedApi.query("saveStat", currentGame, {
            apiType,
            hashedId,
            hostHashedId,
          });

          itemList[idx].status = "complete";
          setItemList([...itemList]);

          return res;
        })
      );

      const isFulfilled = results.every((res) => res.status === "fulfilled");

      if (!isFulfilled) {
        done("서버에 문제가 생겼습니다, 잠시 후에 재시도 해주십시오");
        return;
      }

      const fulfilledResults = results as PromiseFulfilledResult<Response>[];

      if (fulfilledResults.some((res) => res.value.status === 404)) {
        done("에러가 생겼습니다, 정상적인 방법을 통해 참여 해주십시오");
        return;
      } else if (fulfilledResults.some((res) => res.value.status === 400)) {
        done("에러가 생겼습니다, api 요청이 잘못되었습니다.");
        return;
      }

      const finalRes = await SharedApi.query("joinSurvey", currentGame, {
        hashedId,
        hostHashedId,
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
    if (!active) {
      return (
        <>
          <Link href={SharedUtils.generateStatUrl(hostHashedId, currentGame)}>
            <Shared.Button className="bg-blue">설문 보러 가기</Shared.Button>
          </Link>
          <Shared.Button disabled>이미 닫힌 설문입니다</Shared.Button>
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
        {loading ? <ImSpinner className="h-[1.5em] text-lg animate-spin"/> : "설문 참여하기"}
      </Shared.Button>
    );
  };

  if (!hashedId) return (
    <Shared.Frame className="!p-4 bg-dark-black flex flex-col gap-2">
        <div className="uppercase text-center text-xs rounded-full border border-border bg-dark py-2 px-3 flex gap-2 justify-center">
          <p>
            Need to <span className="text-red">Sign in</span> for game,
            <br/>
            {currentGame}
          </p>
        </div>
      
      <div className="w-full fcenter py-2">
        <Auth game={currentGame} redirect={SharedUtils.generateParticipantQRUrl(hostHashedId, currentGame)} />
      </div>
    </Shared.Frame>
  );

  return (
    <>
      <Shared.Frame className="!p-4 sm:p-7 bg-dark-black text-sm sm:text-base" type="large">
        <ul className="flex flex-col gap-6">
          {itemList.map((item, idx) => (
            <li key={idx}>
              <PanelItem {...item} />
            </li>
          ))}
        </ul>
      </Shared.Frame>

      <div className="h-6" />

      <Shared.Frame className="!p-6" type="large">
        <label htmlFor="input-password" className="uppercase">password</label>
        
        <div className="h-2" />

        <p className="text-sm text-bright-gray">※ 없으면 입력 안 해도 됩니다</p>

        <div className="h-6" />

        <Shared.Frame
            type="small"
            className="bg-dimm-dark justify-self-end"
          >
            <input
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              className="py-3 px-4 bg-transparent block w-full h-full"
              id="input-password"
              name="time"
              required
            />
          </Shared.Frame>
      </Shared.Frame>

      <div className="h-10" />

      <div className="flex items-center justify-end gap-2">
      {error ?  <p className="text-red text-sm px-4">{error}</p> : renderButtons()}
      </div>

      {hashedId && (
        <div className="flex items-center justify-end gap-4 mt-4">
          <span className="text-sm text-bright-gray">다른 계정으로 참여하고 싶다면,</span>
          <Signout game={currentGame} />
        </div>
      )}
    </>
  );
}

function PanelItem({
  apiType,
  apiLink,
  types,
  status,
}: LeagueOfLegendsItem) {
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
                className="bg-dimm-dark py-2 px-4 flex items-center justify-between w-full"
              >
                <div className="flex items-center gap-2">
                  <i className="block w-1 h-1 bg-white rounded-full" />
                  <span>{t}</span>
                </div>

                {status === "complete" && <span className="text-blue text-lg"><FaCheckCircle /></span>}
                {status === "loading" && <ImSpinner className="animate-spin"/>}
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
