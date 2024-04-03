"use client"

import React from "react";
import Shared from "@shared";

export default function ClientWaitScreen({
  url,
  onEnd,
  limitMinute,
  endTime,
}: {
  url: string;
  onEnd: () => void;
  limitMinute: number;
  endTime: number;
}) {
  const totalTime = limitMinute * 60 * 1000;
  const startTime = endTime - totalTime;

  return (
    <div>
      <Shared.Timer
        startTime={startTime}
        endTime={endTime}
        totalTime={totalTime}
        width={400}
        height={400}
        onEnd={onEnd}
      />
      {endTime}
      <Shared.QRCode url={url} />

      <Shared.Container>
        URL: {url}
      </Shared.Container>
    </div>
  );
}
