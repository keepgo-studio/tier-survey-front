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

export function generateParticipantQRUrl(hashedId: string, game: SupportGame) {
  return getQuery(`${NEXT_API_URL}/participant/qr`, {
    game,
    hashedId
  });
}

export function generateSignInUrl(game: SupportGame, url?: string) {
  const redirect = url ? url : NEXT_API_URL;

  return getQuery(`${NEXT_API_URL}/auth`, {
    game,
    redirect
  });
}