"use client";

import React, { Suspense, useEffect, useState } from "react";
import Shared, { SharedApi, SharedUtils } from "@shared";
import InputForm from "./InputForm";
import Entities from "@entities";
import { useRouter, useSearchParams } from "next/navigation";
import ClientWaitScreen from "./ClientWaitScreen";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function QRCodeGenerator({
  currentGame,
}: {
  currentGame: SupportGame;
}) {
  const mode = useSearchParams().get("mode");

  const hashedId = Entities.hooks.useAppSelector(Entities.user.selectHashedId);

  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [endTime, setEndTime] = useState(0);
  const [limitMinute, setLimitMinute] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (hashedId === null) {
      router.push(SharedUtils.generateAuthPath(currentGame, window.location.href));
      return;
    }

    SharedApi.query("check-survey", currentGame, {
      hashedId,
    }).then((res) => {
      if (!res) {
        return;
      }

      switch (res.status) {
        case "open":
          setUrl(
            mode === "new"
              ? null
              : SharedUtils.generateParticipantQRUrl(hashedId, currentGame)
          );
          setLimitMinute(res.data!.limitMinute);
          setEndTime(res.data!.endTime);
          break;
        case "closed":
          if (mode !== "new") {
            router.replace(SharedUtils.generateStatUrl(hashedId, currentGame));
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
    if (isEnd && hashedId) {
      router.replace(SharedUtils.generateStatUrl(hashedId, currentGame));
    }
  }, [isEnd, router, hashedId, currentGame]);

  if (loading) return <Shared.Loading />;

  function canOpenNewSurvey() {
    return url;
  }

  function canGoOpenedSurvey() {
    return mode === "new" && endTime;
  }

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
        {canOpenNewSurvey() ? (
          <Link href={SharedUtils.generateHostQRUrl(currentGame, "new")}>
            <Shared.Button>New survey</Shared.Button>
          </Link>
        ) : (
          ""
        )}

        {canGoOpenedSurvey() ? (
          <Link href={SharedUtils.generateHostQRUrl(currentGame, "normal")}>
            <Shared.Button>Go to Opened survey</Shared.Button>
          </Link>
        ) : (
          ""
        )}
      </section>
    </div>
  );
}
