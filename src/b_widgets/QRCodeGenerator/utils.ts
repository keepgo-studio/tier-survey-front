import { SharedUtils } from "@shared";

export function generateQrUrl(hashedId: string, gameName: SupportGame) {
  return SharedUtils.getQuery(`${SharedUtils.NEXT_API_URL}/qr/client`, {
    gameName,
    hashedId
  });
}

export function generateStatUrl(game: SupportGame) {
  return `/stat/${SharedUtils.toCamelCase(game)}`;
}