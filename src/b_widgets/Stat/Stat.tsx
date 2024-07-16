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
    <section className="relative p-6 gap-6 grid lg:grid-cols-[320px_1fr] grid-rows-[auto_1fr]">
      {sidebarRender()}

      <div>
        <Header {...props} />

        <div className="h-6" />

        {statRender()}
      </div>
    </section>
  );
}
