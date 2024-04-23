import React from "react";
import { SharedUtils } from "@shared";
import Widget from "@widgets";

export const dynamicParams = false;

type Params = Record<"gameName", string>;

export function generateStaticParams(): Params[] {
  const games = [
    "league of legends",
    // 'teamfight tactics', - not support yet
    // 'valorant', - not support yet
  ] as SupportGame[];

  return games.map((gameName) => ({
    gameName: SharedUtils.toCamelCase(gameName),
  }));
}

export default function page({ params }: { params: Params }) {
  const currentGame = SharedUtils.toNormalSpace(params.gameName) as SupportGame;

  return <Widget.QRCodeGenerator currentGame={currentGame}/>;
}
