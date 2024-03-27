import { SharedUtils } from "@shared";

export function generateQrUrl(hashedId: string) {
  return `${SharedUtils.NEXT_API_URL}/qr/client/${hashedId}`;
}

export function generateStatUrl(game: SupportGame) {
  return `/stat/${SharedUtils.toCamelCase(game)}`;
}