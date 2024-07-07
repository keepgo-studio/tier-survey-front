"use client";

import React from "react";
import { SharedHooks, SharedUtils } from "@shared";
import Link from "next/link";

export default function CheckStat({
  hashedId,
  currentGame,
}: {
  hashedId: string;
  currentGame: SupportGame;
}) {
  const { data, error, loading } = SharedHooks.useFetch(
    "check-stat-exist",
    currentGame,
    { hashedId }
  );

  console.log(data);

  return (
    <div>
      {/* {data?.exist && (
        <Link
          href={SharedUtils.generateStatUrl(hashedId ?? "", currentGame)}
          className="button-prime"
        >
          Go to Stat page
        </Link>
      )} */}
    </div>
  );
}
