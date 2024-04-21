"use client";

import React, { Suspense, useEffect, useState } from "react";
import Shared, { SharedApi, SharedUtils } from "@shared";
import InputForm from "./InputForm";
import Entities from "@entities";
import { useRouter, useSearchParams } from "next/navigation";
import ClientWaitScreen from "./ClientWaitScreen";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function QRCodeGenerator() {
  const gameName = useSearchParams().get("gameName"),
        mode = useSearchParams().get("mode");

  const hashedId = Entities.hooks.useAppSelector(Entities.user.selectHashedId);

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [endTime, setEndTime] = useState(0);
  const [limitMinute, setLimitMinute] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (gameName === null || gameName === null) {
      router.back();
      return;
    }

    const currentGame = SharedUtils.toNormalSpace(gameName) as SupportGame;

    if (hashedId === null) {
      router.replace(SharedUtils.generateAuthPath(currentGame));
      return;
    }

    setLoading(true);

    SharedApi.query("check-survey", currentGame, {
      hashedId,
    }).then((res) => {
      if (!res) {
        router.push("/");
        return;
      }

      switch (res.status) {
        case "open":
          setUrl(mode === "new" ? "" : SharedUtils.generateQrUrl(hashedId, currentGame));
          setLimitMinute(res.data!.limitMinute);
          setEndTime(res.data!.endTime);
          break;
        case "closed":
          if (mode !== "new") {
            router.push(SharedUtils.generateStatUrl(hashedId, currentGame));
          }
          break;
        case "undefined":
          break;
      }

      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (isEnd && hashedId && gameName) {
      const currentGame = SharedUtils.toNormalSpace(gameName) as SupportGame;
      router.replace(SharedUtils.generateStatUrl(hashedId, currentGame));
    }
  }, [isEnd, router, hashedId, gameName]);

  if (loading) return <Shared.Loading />;

  return (
    <div className="p-6 fcenter flex-col">
      {url ? (
        <ClientWaitScreen
          url={url}
          endTime={endTime}
          limitMinute={limitMinute}
          onEnd={() => setIsEnd(true)}
        />
      ) : (
        <Suspense>
          <InputForm
            onComplete={(url, limitMinute, endTime) => {
              setUrl(url);
              setLimitMinute(limitMinute);
              setEndTime(endTime);
            }}
          />
        </Suspense>
      )}

      <section>
      {url && gameName && (
        <Link
          href={SharedUtils.generateSurveyUrl(
            SharedUtils.toNormalSpace(gameName) as SupportGame,
            "new"
          )}
        >
          <Shared.Button>Cancel survey</Shared.Button>
        </Link>
      )}

      {mode === "normal" && endTime && gameName && (
        <Link
        href={SharedUtils.generateSurveyUrl(
          SharedUtils.toNormalSpace(gameName) as SupportGame,
          "normal"
          )}
        >
          <Shared.Button>Go to Opened survey</Shared.Button>
        </Link>
      )}
      </section>
    </div>
  );
}
