"use server"

import fs from "fs/promises";
import path from "path";

export async function getChampionName(championId: number) {
  const championMapStr = await fs.readFile(
    path.resolve("public/data/champion-map.json"),
    { encoding: "utf-8" }
  );

  const championMap = JSON.parse(championMapStr);

  return championMap[championId];
}