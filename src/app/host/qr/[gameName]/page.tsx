import React from "react";
import { SharedApi, SharedFonts, SharedUtils } from "@shared";
import Widget from "@widgets";

export const dynamicParams = false;

type Params = Record<"gameName", string>;

export async function generateStaticParams() {
  const data = await SharedApi.serverQuery("get-all-support-games", null);

  return data.reduce((arr, gameInfo) => {
    if (gameInfo.available) {
      arr.push({
        gameName: SharedUtils.toCamelCase(gameInfo["game-name"])
      });
    }

    return arr;
  }, [] as Array<Params>);
}

export default function page({ params }: { params: Params }) {
  const currentGame = SharedUtils.toNormalSpace(params.gameName) as SupportGame;

  return (
    <section className="w-full h-full fcenter flex-col">
      <div className={SharedFonts.Danjo.className + " fcenter w-full"}>
        <h1 className="text-6xl md:text-8xl">QR 설문하기</h1>
      </div>

      <div className="h-10"/>

      <Widget.Survey currentGame={currentGame}/>
    </section>
  );
}
