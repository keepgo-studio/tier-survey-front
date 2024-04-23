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


type CheckSurveyResponse = {
  status: "open" | "closed" | "undefined";
  data: {
    limitMinute: number;
    endTime: number;
  } | undefined;
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

export async function saveStat(
  game: SupportGame,
  param: AvailableQueryMap["save-stat"]
) {
  const res: StatResponse = { done: false, error: false };

  await fetch(getUrl("save-stat", game, param))
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

export async function joinSurvey(
  game: SupportGame,
  param: AvailableQueryMap["join-survey"]
) {
  return await fetch(getUrl("join-survey", game, param))
    .then(() => true)
    .catch(() => false);
}

export async function checkJoinSurvey(
  game: SupportGame,
  param: AvailableQueryMap["check-join-survey"]
) {
  return await fetch(getUrl("check-join-survey", game, param))
    .then(res => res.json())
    .catch(() => false);
}

type GameUser ={
  name: string;
  profileIconId: number;
  level: number;
};

export async function getUser(
  game: SupportGame,
  param: AvailableQueryMap["get-user"]
): Promise<GameUser | undefined> {
  return await fetch(getUrl("get-user", game, param))
    .then(res => res.json())
    .catch(() => undefined);
}

export type LeagueOfLegendsChampionInfo = {
  championId: number;
  championLevel: number;
  championPoints: number;
};

type GameStat ={
  tierNumeric: number,
  champions: LeagueOfLegendsChampionInfo[]
};

export async function getStat(
  game: SupportGame,
  param: AvailableQueryMap["get-stat"]
): Promise<GameStat | undefined>{
  return await fetch(getUrl("get-stat", game, param))
    .then(res => res.json())
    .catch(() => undefined);
}

export type LeagueOfLegendsChart = {
  participantCnt: number;
  tierCnt: Record<LeagueOfLegendsTier | "UNRANK", number>;
  flexTierCnt: Record<LeagueOfLegendsTier | "UNRANK", number>;
  totalLevel: number;
  mostLovedChampion: Record<number, number>;
  updateDate: Date;
}

export async function getChart(
  game: SupportGame,
  param: AvailableQueryMap["get-chart"]
): Promise<LeagueOfLegendsChart | undefined>{
  return await fetch(getUrl("get-chart", game, param))
    .then(res => res.json())
    .then(data => ({ ...data, updateDate: new Date(data.updateDate)}))
    .catch(() => undefined);
}