// defining all available apis
interface AvailableQueryMap {
  "check-survey": {
    hashedId: string;
  };
  "create-survey": {
    password: string;
    limitMinute: number;
    hashedId: string;
  };
  "save-stat": {
    // TODO need to append apiTypes for other games
    apiType: LeaugeOfLegendsApiType;
    hashedId: string;
    hostHashedId: string;
  };
  "join-survey": {
    hashedId: string;
    hostHashedId: string;
  }
  "check-join-survey": {
    hashedId: string;
    hostHashedId: string;
  },
  "get-user": {
    hashedId: string;
  };
  "get-stat": {
    hashedId: string;
  };
  "get-chart": {
    hashedId: string;
  };
  "get-top-table": {
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