import React from "react";
import Shared, { SharedApi, SharedUtils } from "@shared";
import Widget from "@widgets";

export const dynamicParams = false;

type Params = Record<"game", string>;

export async function generateStaticParams() {
  const data = await SharedApi.serverQuery("get-all-support-games", null);

  return data.reduce((arr, gameInfo) => {
    if (gameInfo.available) {
      arr.push({
        game: SharedUtils.toCamelCase(gameInfo["game-name"]),
      });
    }

    return arr;
  }, [] as Array<Params>);
}

export default async function page({ params, searchParams: { hashedId } }: { 
  params: Params;
  searchParams: { hashedId?: string; }; 
}) {
  const data = await SharedApi.serverQuery("get-all-support-games", null);
  const currentGame = SharedUtils.toNormalSpace(params.game) as SupportGame;
  const currentGameInfo = data.find(_item => _item["game-name"] === currentGame)!;

  if (!hashedId || !currentGameInfo)
    return (
      <Shared.Frame className="m-auto !w-fit uppercase p-4 text-red">
        wrong connection
      </Shared.Frame>
    );

  return (
    <Widget.Stat hashedId={hashedId} gameInfo={currentGameInfo} />
  );
}
