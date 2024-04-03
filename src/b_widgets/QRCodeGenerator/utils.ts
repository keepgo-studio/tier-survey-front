import { SharedUtils } from "@shared";

export function generateQrUrl(hashedId: string, gameName: SupportGame) {
  return SharedUtils.getQuery(`${SharedUtils.NEXT_API_URL}/participant/qr`, {
    gameName,
    hashedId
  });
}