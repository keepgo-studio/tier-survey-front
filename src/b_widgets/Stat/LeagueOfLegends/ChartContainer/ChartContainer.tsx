"use client";

import React, { useEffect, useState } from "react";
import { StatProps } from "../../Stat";
import Shared, { SharedApi } from "@shared";
import Chart from "./Chart";
import { RiSurveyFill } from "react-icons/ri";

export default function ChartContainer({ gameInfo, hashedId }: StatProps) {
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setLoading(true);
    SharedApi.query("check-survey", "league of legends", { hashedId })
      .then((data) => {
        if (!data) return;

        if (data.status === "closed") setValid(true);
      })
      .finally(() => setLoading(false));
  }, [hashedId]);

  return (
    <Shared.Frame className="!p-4 bg-linear-black h-full relative">
      {loading ? (
        <Shared.Spinner />
      ) : !valid ? (
        <Shared.Frame className="!w-fit !py-3 !px-5 abcenter">
          <p className="text-center text-bright-gray flex gap-2 items-center">
            <RiSurveyFill className="text-purple text-2xl"/> 
            <span className="text-lg">아직 <span className="text-white">끝나지 않은 설문</span>입니다.</span>
          </p>
        </Shared.Frame>
      ) : (
        <Chart />
      )}
    </Shared.Frame>
  );
}
