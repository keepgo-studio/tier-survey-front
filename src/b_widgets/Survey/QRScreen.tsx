"use client";

import Shared, {
  SharedApi,
  SharedHooks,
  SharedUtils,
  SupportGameJsonItem,
} from "@shared";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function QRScreen({
  limitMinute,
  startTime,
  gameInfo,
  hashedId,
}: {
  limitMinute: number;
  startTime: number;
  gameInfo: SupportGameJsonItem;
  hashedId: string;
}) {
  const url = SharedUtils.generateParticipantQRUrl(
    hashedId,
    gameInfo["game-name"]
  );
  const duration = limitMinute * 60 * 1000;
  
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);
  const { asyncOpenClose: confirm, ConfirmModal } = SharedHooks.useModal();

  function copyHandler() {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
  }

  async function resetHandler() {
    const reply = await confirm(
      "cancel survey",
      <p>설문을 취소하시겠습니까?</p>
    );

    if (reply) {
      await SharedApi.query("cancel-survey", gameInfo["game-name"], { hashedId });
      router.refresh();
    }
  }

  return (
    <>
      <Shared.Frame type="large" className="p-8 flex flex-col xl:flex-row items-center gap-12">
        <div>
          <Header>host info.</Header>

          <Shared.HostInfo gameInfo={gameInfo} hashedId={hashedId} />

          <div className="h-12" />

          <Header>qr code.</Header>

          <div className="bg-white w-[320px] h-[320px] fcenter rounded-2xl m-auto">
            <Shared.QRCode url={url} size={240} />
          </div>
        </div>

        <div>
          <Header>current time</Header>

          <div className="flex items-center gap-4">
            <Shared.Timer
              theme="round"
              startTime={startTime}
              duration={duration}
              width={60}
              height={60}
            />
            <Shared.Timer
              theme="text"
              startTime={startTime}
              duration={duration}
              width={280}
              height={100}
            />
          </div>

          <div className="h-12" />

          <Shared.Frame className="w-[480px]">
            <p className="p-4 text-sm w-full truncate" title={url}>
              {url}
            </p>
          </Shared.Frame>

          <div className="h-6" />

          <div className="flex items-center gap-4 justify-end">
            <Shared.Button
              onClick={copyHandler}
              className="text-white shadow-border"
            >
              COPY URL 
              <span className="ml-2 text-sm">{isCopied && "✅"}</span>
            </Shared.Button>
            <Shared.Button onClick={resetHandler} className="bg-purple">
              설문 다시하기
            </Shared.Button>
          </div>
        </div>
      </Shared.Frame>

      <ConfirmModal />
    </>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="uppercase font-light text-xs text-bright-gray mb-3">
      {children}
    </h4>
  );
}
