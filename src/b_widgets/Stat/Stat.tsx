"use client"

import React, { useEffect } from 'react'
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'
import { generateSurveyUrl } from './utils';

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
    if (hashedId === null) router.replace("/");
    
  });

  return (
    <div>
      <section>
        <Link href={generateSurveyUrl(currentGame)}>make survey again</Link>
      </section>
      Stat
    </div>
  )
}
