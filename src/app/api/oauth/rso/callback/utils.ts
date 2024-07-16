import { SharedUtils } from "@shared";

export async function requestRSOToken(accessCode: string) {
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

type SupportRegion = 'ASIA';

type AccountDto = {
  puuid: string;	
  gameName: string;
  tagLine: string;
}

type RiotAPIFailed = {
    status: {
        message: string;
        status_code: number;
    }
}

export class RiotAPI {
  static async requestMe(region: SupportRegion, accessToken: string): Promise<AccountDto | RiotAPIFailed> {
    return await fetch(`https://${region.toLowerCase()}.api.riotgames.com/riot/account/v1/accounts/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(res => res.json());
  }
}

type RSOUser = {
  puuid: string;
  gameName: string;
  tagLine: string;
}

export async function writeUser(game: SupportGame, hashedId:string, user: RSOUser) {
  await fetch(`${SharedUtils.FB_API_URL}/${SharedUtils.toCamelCase(game)}-writeUser`, {
    method: 'post',
    body: JSON.stringify({
      hashedId: hashedId,
      user: {
        hashedId,
        ...user,
      }
    })
  })
}