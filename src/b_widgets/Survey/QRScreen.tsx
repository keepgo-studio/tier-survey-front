"use client";

import Shared, {
  SharedApi,
  SharedHooks,
  SharedUtils,
  SupportGameJsonItem,
} from "@shared";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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
  const [pause, setPause] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [qrSize, setQrSize] = useState(240);
  const { asyncOpenClose: confirm, ConfirmModal } = SharedHooks.useModal();

  useEffect(() => {
    const sizeHandler = () => {
      setQrSize(window.innerWidth < 768 ? 120 : 240);
    }
    sizeHandler();
    window.addEventListener("resize", sizeHandler);

    return () => window.removeEventListener("resize", sizeHandler);
  }, []);

  function copyHandler() {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
  }

  async function resetHandler() {
    const reply = await confirm(
      "cancel survey",
      <p>설문을 취소하시겠습니까?</p>
    );

    setPause(true);

    if (reply) {
      await SharedApi.query("cancel-survey", gameInfo["game-name"], {
        hashedId,
      });
      router.refresh();
    }
  }

  if (pause) return <Shared.Spinner />

  return (
    <>
      <Shared.Frame
        type="large"
        className="!p-8 flex flex-col ll:flex-row ll:items-center gap-12"
      >
        <div>
          <Header>host info.</Header>

          <Shared.HostInfo gameInfo={gameInfo} hashedId={hashedId} />

          <div className="h-12" />

          <Header>qr code.</Header>

          <div className="bg-white fcenter rounded-2xl w-fit m-auto" style={{
            padding: qrSize / 5
          }}>
            <Shared.QRCode url={url} size={qrSize} />
          </div>
        </div>

        <div>
          <Header>duration.</Header>

          <p>
            <span style={{ color: gameInfo["theme-color"]}} className="text-4xl">
              {limitMinute}
            </span> min
          </p>

          <div className="h-8"/>

          <Header>current time.</Header>

          <div className="h-4"/>

          <div className="fcenter flex-col sm:flex-row sm:gap-4">
            <Shared.Timer
              theme="round"
              startTime={startTime}
              duration={duration}
              width={60}
              height={60}
              onEnd={() => setIsEnd(true)}
            />
            <Shared.Timer
              theme="text"
              startTime={startTime}
              duration={duration}
              width={qrSize}
              height={100}
            />
          </div>

          <div className="h-8" />

          <Link
            href={url}
            target="_blank"
            className="block clickable m-auto w-full max-w-[460px]"
          >
            <Shared.Frame>
              <p className="p-4 text-sm w-full break-all" title={url}>
                {isEnd ? (
                  <p className="text-bright-gray text-center">이미 끝난 설문입니다.</p>
                ) : (
                  <p className="w-full md:truncate">{url}</p>
                )}
              </p>
            </Shared.Frame>
          </Link>

          <div className="h-6" />

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-end">
            {isEnd ? (
              <Link href={SharedUtils.generateStatUrl(hashedId, gameInfo["game-name"])}>
                <Shared.Button className="bg-blue">설문 결과 보기</Shared.Button>
              </Link>
            ) : (
              <Shared.Button
                onClick={copyHandler}
                className="text-white shadow-border"
              >
                COPY URL
                <span className="ml-2 text-sm">{isCopied && "✅"}</span>
              </Shared.Button>
            )}
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
