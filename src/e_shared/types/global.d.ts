// defining all available apis
interface AvailableQueryMap {
  "checkSurvey": {
    hashedId: string;
  };
  "cancelSurvey": {
    hashedId: string;
  };
  "getSurvey": {
    hashedId: string;
  };
  "checkStatExist": {
    hashedId: string;
  };
  "createSurvey": {
    password: string;
    limitMinute: number;
    hashedId: string;
  };
  "saveStat": {
    apiType: LeaugeOfLegendsApiType;
    hashedId: string;
    hostHashedId: string;
  };
  "checkSurveyPassword": {
    password: string;
    hostHashedId: string;
  };
  "joinSurvey": {
    hashedId: string;
    hostHashedId: string;
  }
  "checkJoinSurvey": {
    hashedId: string;
    hostHashedId: string;
  };
  "getUser": {
    hashedId: string;
  };
  "getStat": {
    hashedId: string;
  };
  "getChart": {
    hashedId: string;
  };
};

type AvailableQuery = keyof AvailableQueryMap;

type QueryParam<T extends AvailableQuery> = AvailableQueryMap[T];

interface AvailableServerQueryMap {
  "get-all-support-games": null;
}

type AvailableServerQuery = keyof AvailableServerQueryMap;

type ServerQueryParam<T extends AvailableServerQuery> = AvailableServerQueryMap[T];


type SupportGame = "league of legends" | "teamfight tactics" | "valorant";

type LeaugeOfLegendsApiType = "SUMMONER-V4" | "LEAGUE-V4" | "CHAMPION-MASTERY-V4" | "GEO-LOCATION";

type SupportApiType = LeaugeOfLegendsApiType | LocalApiType;

type LeagueOfLegendsTier =
  | "CHALLENGER"
  | "GRANDMASTER"
  | "MASTER"
  | "DIAMOND"
  | "EMERALD"
  | "PLATINUM"
  | "GOLD"
  | "SILVER"
  | "BRONZE"
  | "IRON";

type LeagueOfLegendsRank = "I" | "II" | "III" | "IV";