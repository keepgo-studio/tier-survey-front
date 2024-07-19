"use client";

import { delay, getQuery, toCamelCase } from "../utils/utils";
import { FB_API_URL } from "../utils/vars";

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

export type CheckSurveyResponse = {
  status: "open" | "closed" | "undefined";
  data:
    | {
        limitMinute: number;
        startTime: number;
      }
    | undefined;
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

export async function createSurvey(
  game: SupportGame,
  param: AvailableQueryMap["create-survey"]
) {
  return await fetch(getUrl("create-survey", game, param))
    .then(() => true)
    .catch(() => false);
}

export async function cancelSurvey(
  game: SupportGame,
  param: AvailableQueryMap["cancel-survey"]
) {
  return await fetch(getUrl("cancel-survey", game, param))
    .then(() => true)
    .catch(() => false);
}

export async function checkStatExist(
  game: SupportGame,
  param: AvailableQueryMap["check-stat-exist"]
): Promise<{ exist: boolean; } | undefined> {
  await delay(1000);
  
  return await fetch(getUrl("check-stat-exist", game, param))
    .then(res => res.json())
    .catch(() => undefined);
}



export async function saveStat(
  game: SupportGame,
  param: AvailableQueryMap["save-stat"]
) {
  return await fetch(getUrl("save-stat", game, param));
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
    .then((res) => res.json())
    .catch(() => false);
}

type GameUser = {
  gameName: string;
  profileIconId: number;
  summonerLevel: number;
};

export async function getUser(
  game: SupportGame,
  param: AvailableQueryMap["get-user"]
): Promise<GameUser | undefined> {
  return await fetch(getUrl("get-user", game, param))
    .then((res) => res.json())
    .catch(() => undefined);
}

export type LeagueOfLegendsChampionInfo = {
  championId: number;
  championLevel: number;
  championPoints: number;
};

export type GameStat = {
  tierNumeric: number;
  flexTierNumeric: number;
  champions: LeagueOfLegendsChampionInfo[];
  level: number;
  updateTime: number
};

export async function getStat(
  game: SupportGame,
  param: AvailableQueryMap["get-stat"]
): Promise<GameStat | undefined> {
  return await fetch(getUrl("get-stat", game, param))
    .then((res) => res.json())
    .catch(() => undefined);
}

export type LeagueOfLegendsChart = {
  participantCnt: number;
  tierCnt: Record<LeagueOfLegendsTier | "UNRANK", number>;
  flexTierCnt: Record<LeagueOfLegendsTier | "UNRANK", number>;
  totalLevel: number;
  mostLovedChampionTop10: [string, number][];
  updateTime: number;
};

export async function getChart(
  game: SupportGame,
  param: AvailableQueryMap["get-chart"]
): Promise<LeagueOfLegendsChart | undefined> {
  return await fetch(getUrl("get-chart", game, param))
    .then((res) => res.json())
    .then((data) => ({ ...data, updateDate: new Date(data.updateDate) }))
    .catch(() => undefined);
}
