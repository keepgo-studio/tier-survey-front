import React from "react";
import { SupportGameJsonItem } from "@shared";
import { default as LeagueOfLegendsSidebar } from "./LeagueOfLegends/Sidebar/Sidebar";
import { default as LeagueOfLegendsChartContainer } from "./LeagueOfLegends/ChartContainer/ChartContainer";
import Header from "./Header";

export type StatProps = {
  gameInfo: SupportGameJsonItem;
  hashedId: string;
};

export default function Stat(props: StatProps) {
  const { gameInfo } = props;

  const sidebarRender = () => {
    switch (gameInfo["game-name"]) {
      case "league of legends":
        return <LeagueOfLegendsSidebar {...props} />;
    }
  };

  const statRender = () => {
    switch (gameInfo["game-name"]) {
      case "league of legends":
        return <LeagueOfLegendsChartContainer {...props} />;
    }
  };

  return (
    <section className="relative p-6 gap-6 flex lg:flex-row flex-col justify-center">
      <div className="min-w-[320px]">
      {sidebarRender()}
      </div>

      <div className="flex flex-1 flex-col gap-6 max-w-7xl">
        <Header {...props} />

        <div className="flex-1 min-h-80">{statRender()}</div>
      </div>
    </section>
  );
}
