"use client"

import React, { useEffect, useState } from 'react'
import Entities from '@entities';
import { SharedApi, SharedUtils } from '@shared';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { addLeaveBarrier, removeLeaveBarrier } from './utils';
import CompletePanel from './CompletePanel';

export default function Progress() {
  const hashedId = Entities.hooks.useAppSelector(Entities.user.selectHashedId);

  const hostHashedId = useSearchParams().get("hashedId"),
        gameName = useSearchParams().get("gameName") ?? "",
        currentGame = SharedUtils.toNormalSpace(gameName) as SupportGame,
        apiList = JSON.parse(useSearchParams().get("api") ?? "[]") as SupportApiType[];

  const [statusList, setStatusList] = useState(apiList.map(() => false));
  const [doneMessage, setDoneMessage] = useState("");
  const [endTime, setEndTime] = useState(0);
  const [limitMinute, setLimitMinute] = useState(0);

  const router = useRouter();

  const process = async () => {
    if (!hostHashedId || !hashedId || !currentGame) {
      // TODO should route to each scenario
      // [ ] hashedId -> show login button
      // [ ] hostHashedId -> route to /error (cannot find survey)
      // [ ] currentGame -> route to /error (bad connection)
      return;
    }

    const checkSurveyResult = await SharedApi.query("check-survey", currentGame, { 
      hashedId: hostHashedId
    });

    if (!checkSurveyResult) {
      throw new Error("Server didn't work right now");
    }

    if (checkSurveyResult.status === "undefined") {
      alert("Cannot find survey");
      router.push("/");
      return;
    }

    if (checkSurveyResult.status === "closed") {
      alert("Already closed survey");
      router.push(SharedUtils.generateStatUrl(hostHashedId, currentGame))
      return;
    }

    setEndTime(checkSurveyResult.data!.endTime);
    setLimitMinute(checkSurveyResult.data!.limitMinute);

    const checkJoinResult = await SharedApi.query("check-join-survey", currentGame, {
      hashedId,
      hostHashedId
    });

    
    if (checkJoinResult) {
      setDoneMessage("you've already joined to survey, wait until it ends");
      return;
    }

    const completeList = apiList.map(() => false);

    const resultList = await Promise.all(apiList.map(async (apiType, idx) => {
      const result = await SharedApi.query("save-stat", currentGame, {
        apiType,
        hashedId,
        hostHashedId
      });
      
      completeList[idx] = true;
      setStatusList([...completeList]);

      return result.error;
    }));

    if (resultList.some(isErr => isErr)) {
      alert("Cannot save data to chart, reload page please");
      return;
    }

    const joinResult = await SharedApi.query("join-survey", currentGame, {
      hashedId,
      hostHashedId
    });

    if (!joinResult) {
      alert("Cannot join to Survey");
      return;
    }

    setDoneMessage("Complete join to survey");
    return;
  }

  useEffect(() => {
    addLeaveBarrier();
    process().then(() => removeLeaveBarrier());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!hashedId) {
    // router.push("/login");
    router.push("/");
    return <div />;
  }

  if (!hostHashedId || !currentGame) {
    router.push("/");
    return <div />;
  }

  return (
    <section>
      {doneMessage ? (
        <CompletePanel game={currentGame} hostHashedId={hostHashedId} endTime={endTime} limitMinute={limitMinute} msg={doneMessage}/>
      ) : (
        <ul>
        {apiList.map((api, idx) => (
          <li key={api}>
            {api}

            {statusList[idx] ? "DONE" : "PROGRESS"}
          </li>
        ))}
        </ul>
      )}
    </section>
  )
}
