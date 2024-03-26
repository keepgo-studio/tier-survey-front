import { SharedUtils } from "@shared";

export function generateQrUrl(hashedId: string) {
  return `${SharedUtils.NEXT_API_URL}/qr/client/${hashedId}`;
}