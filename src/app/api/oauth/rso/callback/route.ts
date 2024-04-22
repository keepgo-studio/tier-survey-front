import { NextRequest } from "next/server";
import * as crypto from "crypto";
import { redirect } from "next/navigation";
import { SharedNodeUtils, SharedUtils } from "@shared";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic' // defaults to auto

async function requestRSOToken(accessCode: string) {
  return await fetch("https://auth.riotgames.com/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: accessCode, // Assuming the access code is already url decoded
      redirect_uri: SharedUtils.NEXT_PROD_API_URL + "/api/oauth/rso/callback",
    }),
  }).then(res => res.json());
}

type AccountDto = {
  puuid: string;	
  gameName: string;
  tagLine: string;
}

type AccountFailed = {
    status: {
        message: string;
        status_code: number;
    }
}

async function requestMe(region: 'ASIA', accessToken: string): Promise<AccountDto | AccountFailed> {
  return await fetch(`https://${region.toLowerCase()}.api.riotgames.com/riot/account/v1/accounts/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }).then(res => res.json());
}

async function writeUser(hashedId: string, name: string) {
  await fetch(`${SharedUtils.FB_API_URL}/leagueOfLegends-writeUser`, {
    method: 'post',
    body: JSON.stringify({
      hashedId,
      user: {
        hashedId,
        name
      }
    })
  })
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const accessCode = searchParams.get('code');

  if (!accessCode) {
    return new Response("cannot get code", {
      status: 400
    });
  }

  try {
    const payload = await requestRSOToken(accessCode);

    const me = await requestMe(
      "ASIA",
      payload.access_token
    );

    if (!("puuid" in me)) {
      return new Response("cannot find user", {
        status: 404
      });
    };

    const hashedId = crypto
      .createHash("sha256")
      .update(me.puuid)
      .digest("hex");

    await writeUser(hashedId, me.gameName);

    const cookieStore = cookies();

    cookieStore.set('hashed-id', SharedNodeUtils.encrypt(hashedId), {
      secure: true, 
      httpOnly: true
    });
  } catch {
    console.error("error while getting token")
  }

  const returnUrl = searchParams.get("state") ?? "/";
  redirect(returnUrl);
}