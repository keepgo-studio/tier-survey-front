"use client"

import React, { useEffect, useState } from 'react'
import Entities from '@entities';
import { SharedApi, SharedUtils } from '@shared';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function Progress() {
  const hashedId = Entities.hooks.useAppSelector(Entities.user.selectHashedId);

  const hostHashedId = useSearchParams().get("hashedId"),
        gameName = useSearchParams().get("gameName") ?? "",
        currentGame = SharedUtils.toNormalSpace(gameName) as SupportGame,
        apiList = JSON.parse(useSearchParams().get("api") ?? "[]") as SupportApiType[];

  const [statusList, setStatusList] = useState(apiList.map(() => false));

  const router = useRouter();

  const process = async () => {
    const res = await SharedApi.query("check-survey", currentGame, { 
      hashedId: hostHashedId!
    });

    if (!res) {
      throw new Error("Server didn't work right now");
    }

    if (res.status === "undefined") {
      alert("Cannot find survey");
      router.push("/");
      return;
    }

    if (res.status === "closed") {
      alert("Already closed survey");
      router.push(SharedUtils.generateStatUrl(hostHashedId!, currentGame))
      return;
    }

    const completeList = apiList.map(() => false);

    Promise.all(apiList.map(async (apiType, idx) => {
      await SharedApi.query("save-league-of-legends-stat", currentGame, {
        apiType,
        hashedId: hashedId!,
        hostHashedId: hostHashedId!
      });
      
      completeList[idx] = true;

      setStatusList([...completeList]);
    }));
  }

  useEffect(() => {
    if (!hashedId) {
      // router.push("/login");
      router.push("/");
      return;
    }

    if (!hostHashedId || !currentGame) {
      router.push("/");
      return;
    }

    process();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <ul>
      {apiList.map((api, idx) => (
        <li key={api}>
          {api}

          {statusList[idx] ? "DONE" : "PROGRESS"}
        </li>
      ))}
      </ul>
    </section>
  )
}
