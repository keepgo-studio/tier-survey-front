"use client";

import Shared, { SharedUtils } from "@shared";
import { useRouter } from "next/navigation";
import React from "react";

export default function CompletePanel({
  hostHashedId,
  game,
  endTime,
  limitMinute,
  msg,
}: {
  hostHashedId: string;
  game: SupportGame;
  endTime: number;
  limitMinute: number;
  msg: string;
}) {
  const totalTime = limitMinute * 60 * 1000;
  const startTime = endTime - totalTime;

  const router = useRouter();

  return (
    <section>
      <h1>Complete survey!</h1>

      <p>wait until...</p>

      <Shared.Timer
        startTime={startTime}
        endTime={endTime}
        totalTime={totalTime}
        width={200}
        height={200}
        onEnd={() =>
          router.push(SharedUtils.generateStatUrl(hostHashedId, game))
        }
      />
    </section>
  );
}
