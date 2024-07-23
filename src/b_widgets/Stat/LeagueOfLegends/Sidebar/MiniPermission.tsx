'use client'

import Shared, { SharedApi } from '@shared'
import React, { useState } from 'react'
import { LeagueOfLegendsPermissions } from 'src/b_widgets/PermissionPanel/utils';

export default function MiniPermission({
  currentGame,
  hashedId,
  hostHashedId
}: {
  currentGame: SupportGame;
  hashedId: string;
  hostHashedId: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleJoinForHost = async () => {
    setLoading(true);

    await Promise.allSettled(
      LeagueOfLegendsPermissions.map(async ({ apiType }) => SharedApi.query("saveStat", currentGame, {
        apiType,
        hashedId,
        hostHashedId
      }))
    );

    await SharedApi.query("joinSurvey", currentGame, { hashedId, hostHashedId });

    window.location.reload();
  }

  if (loading) return <Shared.Spinner />;

  return (
    <div>
      <p className="text-sm text-bright-gray p-2">
        설문이 끝난 후에는,
        <br/>
        Host만 다시 설문에 참가할 수 있습니다.
      </p>
      <div className="flex justify-end">
        <Shared.Button className="bg-purple text-sm !w-fit" onClick={handleJoinForHost}>
          설문 참가하기
        </Shared.Button>
      </div>
    </div>
  )
}
