// defining all available apis
interface AvailableQueryMap {
  "check-survey": {
    hashedId: string;
  };
  "create-survey": {
    keyword: string;
    limitMinute: number;
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