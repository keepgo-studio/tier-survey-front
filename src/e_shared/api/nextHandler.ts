"use server";

import fs from "fs/promises";
import path from "path";

export type SupportGameJsonItem = {
  "game-name": SupportGame;
  "logo-img": string;
  "theme-color": string;
  available: boolean;
};

export async function getAllSupportGames(): Promise<SupportGameJsonItem[]> {
  const data = await fs.readFile(
    path.resolve("public/data/support-games.json"),
    { encoding: "utf-8" }
  );

  return JSON.parse(data);
}
