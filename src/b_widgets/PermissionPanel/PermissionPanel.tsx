"use client";

import React, { useEffect, useState } from "react";
import LeagueOfLegendsPanel from "./LeagueOfLegendsPanel";
import Shared, { SharedApi, SharedUtils } from "@shared";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

export default function PermissionPanel(props: {
  currentGame: SupportGame;
  hostHashedId: string;
}) {
  const { currentGame, hostHashedId } = props;
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isFinish, setIsFinish] = useState(false);

  useEffect(() => {
    setLoading(true);
    SharedApi.query("check-survey", currentGame, {
      hashedId: hostHashedId,
    })
      .then((res) => setIsOpen(res?.status === "open"))
      .finally(() => setLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Shared.Spinner withText={false} />

  if (isFinish) return (
    <Shared.Frame className="!w-fit !p-10 bg-dark-black flex flex-col gap-12 m-auto">
      <Shared.Frame className="!w-fit !p-4 m-auto">
        <FaCheckCircle className="text-6xl text-blue"/>
      </Shared.Frame>

      <h4 className="font-bold text-center text-xl">설문 참여가 완료되었습니다</h4>

      <div className="flex justify-end">
        <Link href={SharedUtils.generateStatUrl(hostHashedId, currentGame)}>
          <Shared.Button className="bg-blue">설문 보러 가기</Shared.Button>
        </Link>
      </div>
    </Shared.Frame>
  )

  if (props.currentGame === "league of legends") {
    return (
      <LeagueOfLegendsPanel
        {...props}
        onFinish={() => setIsFinish(true)}
        open={isOpen}
      />
    );
  }
}
