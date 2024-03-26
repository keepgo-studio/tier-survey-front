import { getQuery, toCamelCase } from "@shared-inner/utils/utils";
import { FB_API_URL } from "@shared-inner/utils/vars";

function getUrl<T extends AvailableQuery>(
  feature: AvailableQuery,
  game: SupportGame,
  param: QueryParam<T>
) {
  return getQuery(
    FB_API_URL + `/${toCamelCase(game)}-` + toCamelCase(feature),
    param
  );
}

export async function getSurveyUrl(
  game: SupportGame,
  param: AvailableQueryMap["create-survey"]
) {
  return await fetch(getUrl("create-survey", game, param))
    .then(() => true)
    .catch(() => false);
}

type FS_Survey = {
  game: SupportGame;
  keyword: string;
  limitMinute: number;
  endTime: number;
};

export type CheckSurveyResponse = {
  status: "open" | "closed" | "undefined";
  data: FS_Survey | undefined;
};

export async function checkSurvey(
  game: SupportGame,
  param: AvailableQueryMap["check-survey"]
): Promise<CheckSurveyResponse | undefined> {
  const d: CheckSurveyResponse | undefined = await fetch(
    getUrl("check-survey", game, param)
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));

  return d;
}
