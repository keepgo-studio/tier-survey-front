import React from "react";
import { SharedUtils } from "@shared";

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
  return <div>page {params.gameName}</div>;
}