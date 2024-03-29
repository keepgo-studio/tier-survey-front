"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

export default function Stat({
  gameName
}: {
  gameName: string
}) {
  const searchParam = useSearchParams(),
        hashedId = searchParam.get("hashedId"),
        router = useRouter();

  useEffect(() => {
    if (hashedId === null) router.replace("/");
    
  });

  return (
    <div>Stat</div>
  )
}
