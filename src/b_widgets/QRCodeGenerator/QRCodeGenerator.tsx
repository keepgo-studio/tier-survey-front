"use client";

import React, { Suspense, useEffect, useState } from "react";
import Shared, { SharedApi, SharedUtils } from "@shared";
import InputForm from "./InputForm";
import Entities from "@entities";
import { useRouter, useSearchParams } from "next/navigation";
import { generateQrUrl, generateStatUrl } from "./utils";
import ClientWaitScreen from "./ClientWaitScreen";

export default function QRCodeGenerator() {
  const gameName = useSearchParams().get("gameName");

  const hashedId = Entities.hooks.useAppSelector(
    Entities.user.selectHashedId
  );

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [endTime, setEndTime] = useState(0);
  const [limitMinute, setLimitMinute] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (gameName === null || hashedId === null) {
      router.replace("/");
      return;
    }

    const currentGame = SharedUtils.toNormalSpace(gameName) as SupportGame;

    SharedApi.query("check-survey", currentGame, {
      hashedId,
    }).then((res) => {
      if (!res) {
        router.replace("/");
        return;
      }

      switch (res.status) {
        case "open":
          setUrl(generateQrUrl(hashedId, currentGame));
          setLimitMinute(res.data!.limitMinute);
          setEndTime(res.data!.endTime);
          break;
        case "closed":
          router.replace(generateStatUrl(hashedId, currentGame));
          break;
        case "undefined":
          break;
      }

      setLoading(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    
    if (isEnd && hashedId && gameName) {
      const currentGame = SharedUtils.toNormalSpace(gameName) as SupportGame;
      router.replace(generateStatUrl(hashedId, currentGame));
    }
  }, [isEnd, router, hashedId, gameName]);

  if (loading) return  <Shared.Loading />;

  return (
    <div className="p-6">
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
    </div>
  );
}
