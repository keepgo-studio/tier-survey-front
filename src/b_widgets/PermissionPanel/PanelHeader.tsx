"use client"

import React, { useEffect, useState } from 'react'
import { SharedApi, SharedUtils } from '@shared';
import { useSearchParams } from 'next/navigation';

export default function PanelHeader() {
  const hostHashed = useSearchParams().get("hashedId"),
        gameName = useSearchParams().get("gameName") ?? "",
        currentGame = SharedUtils.toNormalSpace(gameName) as SupportGame;

  const [hostName, setHostName] = useState("");

  useEffect(() => {
    if (!hostHashed || currentGame) return;

    SharedApi.query("get-user", currentGame, {
      hashedId: hostHashed
    }).then(user => {
      if (!user) return;
      setHostName(user.name);
    });
  }, [hostHashed, currentGame]);

  return (
    <header>
      <h1>{currentGame} Survey</h1>
      
      <h2>Join Survey from User: {hostName}</h2>
    </header>
  )
}
