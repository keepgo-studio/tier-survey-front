"use client"

import React, { useEffect } from 'react'
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'
import { SharedUtils } from '@shared';


export default function Stat({
  currentGame
}: {
  currentGame: SupportGame
}) {
  const searchParam = useSearchParams(),
        hashedId = searchParam.get("hashedId"),
        router = useRouter();
  // [ ] check hashsedId - if same id, show 'make survey' button
  useEffect(() => {
    if (hashedId === null) {
      router.replace("/");
      return;
    }
    
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <section>
        <Link href={SharedUtils.generateSurveyUrl(currentGame, "new")}>make survey again</Link>
      </section>
      Stat
    </div>
  )
}
