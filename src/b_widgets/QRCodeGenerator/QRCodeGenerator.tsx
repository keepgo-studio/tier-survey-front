"use client";

import React, { Suspense, useEffect, useState } from "react";
import Shared, { SharedApi } from "@shared";
import InputForm from "./InputForm";
import Entities from "@entities";
import { useRouter } from "next/navigation";
import { generateQrUrl } from "./utils";

export default function QRCodeGenerator() {
  const hashedId = Entities.hooks.useAppSelector(Entities.user.selectHashedId);
  const currentGame = Entities.hooks.useAppSelector(
    Entities.user.selectCurrentGame
  );

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (currentGame === null || hashedId === null) {
      router.replace("/");
      return;
    }

    SharedApi.query("check-survey", currentGame, {
      hashedId,
    }).then((res) => {
      setLoading(false);
      
      if (!res) {
        router.replace("/");
        return;
      }

      switch(res.status) {
        case "open":
          setUrl(generateQrUrl(hashedId));
          return;
        case "closed":
          // router.replace("/stat");
          return;
        case "undefined":
          return;
      }
    });
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Shared.Loading />

  return (
    <div className="p-6">
      {url ? (
        <Shared.QRCode url={url} />
      ) : (
        <Suspense>
          <InputForm onComplete={(url) => setUrl(url)} />
        </Suspense>
      )}
    </div>
  );
}
