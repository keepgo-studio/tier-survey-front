export type LeagueOfLegendsItem = {
  apiType: SupportApiType;
  apiLink: string;
  types: string[];
  status: "not-load" | "loading" | "complete";
};

export const LeagueOfLegendsPermissions: LeagueOfLegendsItem[] = [
  {
    apiType: "SUMMONER-V4",
    apiLink: "https://developer.riotgames.com/apis#summoner-v4",
    types: ["소환사 닉네임", "소환사 레벨"],
    status: "not-load",
  },
  {
    apiType: "LEAGUE-V4",
    apiLink: "https://developer.riotgames.com/apis#league-v4",
    types: ["솔로 랭크 티어"],
    status: "not-load",
  },
  {
    apiType: "CHAMPION-MASTERY-V4",
    apiLink: "https://developer.riotgames.com/apis#champion-mastery-v4",
    types: ["가장 많이 다룬 챔피언들 정보"],
    status: "not-load",
  },
]