'use server'

import { SharedUtils } from "@shared";
import { cookies } from "next/headers"

export async function removeHashedId(game: SupportGame) {
  const gameInfo = SharedUtils.OAUTH_COOKIE.find(_g => _g.game === game);

  if (gameInfo) {
    cookies().delete(gameInfo.cookieKey);
  }
}