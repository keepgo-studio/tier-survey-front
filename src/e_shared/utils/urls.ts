import { getQuery, toCamelCase } from "./utils";
import { NEXT_API_URL } from "./vars";

export function generateStatUrl(hashedId: string, game: SupportGame) {
  return getQuery(`${NEXT_API_URL}/host/stat/${toCamelCase(game)}`, {
    hashedId
  });
}

export function generateHostQRUrl(game: SupportGame) {
  return getQuery(`${NEXT_API_URL}/host/qr/${toCamelCase(game)}`, {});
}

export function generateParticipantQRUrl(hashedId: string, gameName: SupportGame) {
  return getQuery(`${NEXT_API_URL}/participant/qr`, {
    gameName,
    hashedId
  });
}

export function generateAuthPath(gameName: SupportGame, path: string) {
  switch(gameName) {
    case "league of legends":
    case "teamfight tactics":
    case "valorant":
      return getQuery(`${NEXT_API_URL}/auth`, {
        provider: "riot",
        path
      });
  }
}