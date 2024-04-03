"use client"

import React from 'react'
import { SharedUtils } from '@shared';
import { useRouter, useSearchParams } from 'next/navigation'
import LeagueOfLegendsPanel from './LeagueOfLegendsPanel';

export default function PermissionPanel() {
  const router = useRouter();

  const hostHashed = useSearchParams().get("hashedId"),
        gameName = useSearchParams().get("gameName") ?? "",
        currentGame = SharedUtils.toNormalSpace(gameName) as SupportGame;

  if (!hostHashed || !gameName) {
    router.push('/');
    return;
  }

  if (currentGame === 'league of legends') {
    return <LeagueOfLegendsPanel />
  }
}
