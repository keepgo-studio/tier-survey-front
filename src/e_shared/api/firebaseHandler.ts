"use client";

import { delay, getQuery, toCamelCase } from "../utils/utils";
import { FB_API_URL } from "../utils/vars";

function getUrl<T extends AvailableQuery>(
  feature: T,
  game: SupportGame,
  param: QueryParam<T>
) {
  return getQuery(
    FB_API_URL + `/${toCamelCase(game)}-` + feature,
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
  param: AvailableQueryMap["checkSurvey"]
): Promise<CheckSurveyResponse | undefined> {
  const d: CheckSurveyResponse | undefined = await fetch(
    getUrl("checkSurvey", game, param)
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));

  return d;
}

export async function createSurvey(
  game: SupportGame,
  param: AvailableQueryMap["createSurvey"]
) {
  return await fetch(getUrl("createSurvey", game, param))
    .then(() => true)
    .catch(() => false);
}

export async function cancelSurvey(
  game: SupportGame,
  param: AvailableQueryMap["cancelSurvey"]
) {
  return await fetch(getUrl("cancelSurvey", game, param))
    .then(() => true)
    .catch(() => false);
}

export type Survey = {
  password: string;
  startTime: number;
  limitMinute: number;
}

export async function getSurvey(  
  game: SupportGame,
  param: AvailableQueryMap["getSurvey"]
): Promise<Survey | undefined> {
  return await fetch(getUrl("getSurvey", game, param))
    .then((res) => res.json())
    .catch(() => undefined);
}

export async function checkStatExist(
  game: SupportGame,
  param: AvailableQueryMap["checkStatExist"]
): Promise<{ exist: boolean; } | undefined> {
  await delay(1000);
  
  return await fetch(getUrl("checkStatExist", game, param))
    .then(res => res.json())
    .catch(() => undefined);
}

export async function saveStat(
  game: SupportGame,
  param: AvailableQueryMap["saveStat"]
) {
  return await fetch(getUrl("saveStat", game, param));
}

export async function checkSurveyPassword(
  game: SupportGame,
  param: AvailableQueryMap["checkSurveyPassword"]
): Promise<{ 
  state: "wrong" | "correct" | "closed"
} | undefined> {
  return await fetch(getUrl("checkSurveyPassword", game, param))
    .then(res => res.json())
    .catch(() => undefined);
}

export async function joinSurvey(
  game: SupportGame,
  param: AvailableQueryMap["joinSurvey"]
) {
  return await fetch(getUrl("joinSurvey", game, param))
    .then((res) => res.status === 200)
    .catch(() => false);
}

export async function checkJoinSurvey(
  game: SupportGame,
  param: AvailableQueryMap["checkJoinSurvey"]
): Promise<boolean> {
  return await fetch(getUrl("checkJoinSurvey", game, param))
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
  param: AvailableQueryMap["getUser"]
): Promise<GameUser | undefined> {
  return await fetch(getUrl("getUser", game, param))
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
  param: AvailableQueryMap["getStat"]
): Promise<GameStat | undefined> {
  return await fetch(getUrl("getStat", game, param))
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
  param: AvailableQueryMap["getChart"]
): Promise<LeagueOfLegendsChart | undefined> {
  return await fetch(getUrl("getChart", game, param))
    .then((res) => res.json())
    .then((data) => ({ ...data, updateDate: new Date(data.updateDate) }))
    .catch(() => undefined);
}