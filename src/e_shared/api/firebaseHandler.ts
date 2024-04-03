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

type SurveyClient = {
  limitMinute: number;
  endTime: number;
};

type CheckSurveyResponse = {
  status: "open" | "closed" | "undefined";
  data: SurveyClient | undefined;
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

export async function getSurveyUrl(
  game: SupportGame,
  param: AvailableQueryMap["create-survey"]
) {
  return await fetch(getUrl("create-survey", game, param))
    .then(() => true)
    .catch(() => false);
}

type StatResponse = {
  done: boolean;
  error: boolean;
};

export async function saveLeagueOfLegendsStat(
  param: AvailableQueryMap["save-league-of-legends-stat"]
) {
  const res: StatResponse = { done: false, error: false };

  await fetch(getUrl("save-league-of-legends-stat", "league of legends", param))
    .then(() => {
      res.done = true;
      res.error = false;
    })
    .catch((err) => {
      console.error(err);
      res.done = true;
      res.error = true;
    });

  return res;
}
