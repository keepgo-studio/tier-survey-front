import { NextRequest } from "next/server";
import * as crypto from "crypto";
import { redirect } from "next/navigation";
import { SharedNodeUtils, SharedUtils } from "@shared";
import { cookies } from "next/headers";
import { requestRSOToken, RiotAPI, writeUser } from "./utils";

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const accessCode = searchParams.get('code');
  const state = searchParams.get("state");

  if (!accessCode) {
    return new Response("cannot get code", {
      status: 400
    });
  }

  if (!state) {
    return new Response("state parameter needed", {
      status: 400
    });
  }

  // const { game, redirect: redirectUrl } = JSON.parse(state) as State;
  const game = "league of legends";
  const redirectUrl = state;

  try {
    const payload = await requestRSOToken(accessCode);

    if (!("access_token" in payload)) {
      throw new Error("error while getting token");
    }

    const me = await RiotAPI.requestMe(
      "ASIA",
      payload.access_token
    );

    if (!("puuid" in me)) {
      throw new Error("cannot find user");
    };

    const hashedId = crypto
      .createHash("sha256")
      .update(me.puuid)
      .digest("hex");

    await writeUser(game, hashedId, { ...me });

    const cookieStore = cookies();

    const gameInfo = SharedUtils.OAUTH_COOKIE.find(_g => _g.game === game);

    if (gameInfo) {
      cookieStore.set(gameInfo.cookieKey, SharedNodeUtils.encrypt(hashedId), {
        secure: true, 
        httpOnly: true
      });
    }
  } catch (err) {
    console.error(err);

    const cookieStore = cookies();

    cookieStore.set('api-error', '');
  }

  redirect(redirectUrl);
}