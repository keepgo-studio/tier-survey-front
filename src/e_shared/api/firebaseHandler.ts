import { getQuery } from "@shared-inner/utils/utils";
import { FB_API_URL } from "@shared-inner/utils/vars";

export type BookReturn = boolean;

type validUrl = "createSurvey";

export async function getSurveyUrl(
  param: AvailableQueryMap["create-survey"]
): Promise<BookReturn> {
  const query = getQuery(FB_API_URL + "/leagueOfLegends-" + "createSurvey", param);

  return await fetch(query)
    .then(() => true)
    .catch(() => false);
}