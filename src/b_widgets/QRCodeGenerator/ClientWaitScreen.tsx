"use client";

import React, { useState } from "react";
import Shared from "@shared";
import Link from "next/link";

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

  const [isCopied, setIsCopied] = useState(false);

  function copyHandler() {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
  }

  return (
    <div className="fcenter flex-col">
      <Shared.Timer
        startTime={startTime}
        endTime={endTime}
        totalTime={totalTime}
        width={400}
        height={400}
        onEnd={onEnd}
      />

      <Shared.QRCode url={url} />

      <Link href={url} target="_blank">
        <Shared.Container>Join survey</Shared.Container>
      </Link>

      <Shared.Button onClick={copyHandler}>
        Copy QR URL {isCopied && '✅'}
      </Shared.Button>
    </div>
  );
}
