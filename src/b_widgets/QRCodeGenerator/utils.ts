import { SharedUtils } from "@shared";

export function generateQrUrl(hashedId: string, gameName: SupportGame) {
  return SharedUtils.getQuery(`${SharedUtils.NEXT_API_URL}/participant/qr`, {
    gameName,
    hashedId
  });
}

export function generateStatUrl(hashedId: string, game: SupportGame) {
  return SharedUtils.getQuery(`/stat/${SharedUtils.toCamelCase(game)}`, {
    hashedId
  });
}