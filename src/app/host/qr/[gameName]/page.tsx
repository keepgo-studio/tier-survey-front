import React from "react";
import { SharedApi, SharedUtils } from "@shared";
import Widget from "@widgets";

export const dynamicParams = false;

type Params = Record<"gameName", string>;

export async function generateStaticParams() {
  const data = await SharedApi.serverQuery("get-all-support-games", null);

  return data.reduce((arr, gameInfo) => {
    if (gameInfo.available) {
      arr.push({
        gameName: SharedUtils.toCamelCase(gameInfo["game-name"]),
      });
    }

    return arr;
  }, [] as Array<Params>);
}

export default async function page({ params }: { params: Params }) {
  const data = await SharedApi.serverQuery("get-all-support-games", null);
  const currentGame = SharedUtils.toNormalSpace(params.gameName) as SupportGame;
  const currentGameInfo = data.find(_item => _item["game-name"] === currentGame)!;

  return (
    <section className='max-w-5xl m-auto w-full h-full p-6 flex flex-col justify-center'>
      <Widget.Title gameInfo={currentGameInfo}>create survey</Widget.Title>

      <Widget.Survey gameInfo={currentGameInfo} />
    </section>
  );
}
