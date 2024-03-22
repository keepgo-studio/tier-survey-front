import { getQuery, toCamelCase } from "@shared-inner/utils/utils";
import { FB_API_URL } from "@shared-inner/utils/vars";

export type BookReturn = boolean;

type validFeature = "createSurvey" | "checkSurvey";

function getUrl<T extends AvailableQuery>(
  feature: validFeature,
  game: SupportGame,
  param: QueryParam<T>
) {
  return getQuery(FB_API_URL + `/${toCamelCase(game)}-` + feature, param);
}

export async function getSurveyUrl(
  game: SupportGame,
  param: AvailableQueryMap["create-survey"]
): Promise<BookReturn> {
  const d = await fetch(getUrl("createSurvey", game, param))
    .then(() => true)
    .catch(() => false);

  return d;
}
