import { getQuery, toCamelCase } from "./utils";
import { NEXT_API_URL } from "./vars";

export function generateStatUrl(hashedId: string, game: SupportGame) {
  return getQuery(`/stat/${toCamelCase(game)}`, {
    hashedId
  });
}

export function generateSurveyUrl(gameName: SupportGame, mode: 'new' | 'normal') {
  return getQuery(`${NEXT_API_URL}/host/qr`, {
    gameName,
    mode
  });
}

export function generateQrUrl(hashedId: string, gameName: SupportGame) {
  return getQuery(`${NEXT_API_URL}/participant/qr`, {
    gameName,
    hashedId
  });
}