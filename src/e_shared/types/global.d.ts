// defining all available apis
interface AvailableQueryMap {
  "create-survey": {
    keyword: string;
    limitMinute: number;
    hashedId: string;
  };
};

type AvailableQuery = keyof {
  [K in keyof AvailableQueryMap]: AvailableQueryMap[K];
};

type QueryParam<T extends AvailableQuery> = AvailableQueryMap[T];

interface AvailableServerQueryMap {
  "get-all-support-games": null;
}

type AvailableServerQuery = keyof {
  [K in keyof AvailableServerQueryMap]: AvailableServerQueryMap[K];
};

type ServerQueryParam<T extends AvailableServerQuery> = AvailableServerQueryMap[T];


type SupportGame = "league of legends" | "teamfight tactics" | "valorant";