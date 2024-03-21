// defining all available apis
interface AvailableQueryMap {
  "get-all-support-games": null;
  "book-survey": {
    keyword: string;
    limitMinute: number;
    hashedId: string;
  };
};

type AvailableQuery = keyof {
  [K in keyof AvailableQueryMap]: AvailableQueryMap[K];
};

type QueryParam<T extends AvailableQuery> = AvailableQueryMap[T];

type SupportGame = 'league of legends';

type QueryParams = {
  [K in keyof AvailableQueryMap]: AvailableQueryMap[K];
};
