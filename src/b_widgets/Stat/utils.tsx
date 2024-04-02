import { SharedUtils } from "@shared";

export function generateSurveyUrl(gameName: SupportGame) {
  return SharedUtils.getQuery(`${SharedUtils.NEXT_API_URL}/host/qr`, {
    gameName,
    mode: 'new'
  });
}
