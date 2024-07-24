"use client";

import React, { useEffect, useState } from "react";
import { StatProps } from "../../Stat";
import Shared, { SharedApi } from "@shared";
import Chart from "./Chart";
import { RiSurveyFill } from "react-icons/ri";

export default function ChartContainer(props: StatProps) {
  const { hashedId } = props;
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState<"open" | "closed" | "undefined">("undefined");

  useEffect(() => {
    setLoading(true);
    SharedApi.query("checkSurvey", "league of legends", { hashedId })
      .then((data) => {
        if (!data) return;
        setValid(data.status);
      })
      .finally(() => setLoading(false));
  }, [hashedId]);

  const render = () => {
    switch(valid) {
      case "undefined":
        return (
          <Shared.Frame className="!w-fit !py-3 !px-5 abcenter">
            <p className="text-center text-bright-gray flex gap-2 items-center">
              <RiSurveyFill className="text-red text-2xl"/> 
              <span className="text-lg">설문을 찾지 못했습니다.</span>
            </p>
          </Shared.Frame>
        );
      case "closed":
        return (
          <Chart {...props} />
        );
      case "open":
        return (
          <Shared.Frame className="!w-fit !py-3 !px-5 abcenter">
            <p className="text-center text-bright-gray flex gap-2 items-center">
              <RiSurveyFill className="text-purple text-2xl"/> 
              <span className="text-lg">아직 <span className="text-white">끝나지 않은 설문</span>입니다.</span>
            </p>
          </Shared.Frame>
        );
    }
  }
  return (
    <Shared.Frame className="!p-6 bg-linear-black h-full relative">
      {loading ? (
        <div className="abcenter">
          <Shared.Spinner withText={false} />
  
          <div className="h-4" />
  
          <p className="text-lg text-bright-gray text-center">check survey...</p>
        </div>
      ) : render()}
    </Shared.Frame>
  );
}
