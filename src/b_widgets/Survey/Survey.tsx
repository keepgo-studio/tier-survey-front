"use client";

import React, { Suspense, useEffect } from "react";
import Shared, { SharedApi, SharedHooks, SharedUtils } from "@shared";
import Entities from "@entities";
import { useRouter } from "next/navigation";
import QRMakerScreen from "./screen/QRMakerScreen";
import QRScreen from "./screen/QRScreen";
import CheckStat from "./CheckStat";
import { ErrorBoundary } from "react-error-boundary";

export default function Survey({ currentGame }: { currentGame: SupportGame }) {
  const router = useRouter();

  const { asyncOpenClose: alert, AlertModal } = SharedHooks.useModal();
  const selector = Entities.hooks.useAppSelector,
        disptach = Entities.hooks.useAppDispatch();

  const hashedId = selector(Entities.user.selectHashedId),
        isOpen = selector(Entities.survey.selectOpen),
        { setOpen, setLimitMinute, setEndTime } = Entities.survey;

  async function checkSurvey() {
    if (hashedId === null) return;

    const res = await SharedApi.query("check-survey", currentGame, {
      hashedId,
    });

    if (!res) return;

    if (res.status === "open") {
      disptach(setEndTime(res.data!.endTime));
      disptach(setLimitMinute(res.data!.limitMinute));
      disptach(setOpen(true));
    } else {
      disptach(Entities.survey.setOpen(false));
    }
  }

  useEffect(() => {
    if (hashedId === null) {
      const prevPath = window.location.href;

      alert(`You have to Login before open ${currentGame} survey`).then(() => {
        router.push(SharedUtils.generateAuthPath(currentGame, prevPath));
      });
      return;
    }

    checkSurvey();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className="p-6 flex flex-col gap-4 min-w-96">
        {hashedId && (
          <CheckStat 
            hashedId={hashedId}
            currentGame={currentGame}
          />
        )}

        {!isOpen ? (
          <QRMakerScreen currentGame={currentGame} />
        ) : (
          <QRScreen
            hashedId={hashedId ?? "undefined"}
            currentGame={currentGame}
            onEnd={() => router.push(SharedUtils.generateStatUrl(hashedId!, currentGame))}
          />
        )}
      </section>

      <AlertModal />
    </>
  );
}
