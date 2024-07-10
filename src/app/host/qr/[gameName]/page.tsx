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
  const current = data.find(_item => _item["game-name"] === currentGame)!;

  return (
    <section className='max-w-5xl m-auto flex-1 p-6'>
      <h1 className='uppercase text-bright-gray text-4xl font-light w-full'>
        create survey
      </h1>

      <div className='h-6' />

      <h4 className="uppercase text-xl py-1 flex items-center gap-2">
        <i
          className="block w-3 h-[1em]"
          style={{
            backgroundColor: `${current?.["theme-color"]}`,
          }}
        />
        <span>{currentGame}</span>
      </h4>

      <div className="h-6" />

      <Widget.Survey gameInfo={current} />
    </section>
  );
}
