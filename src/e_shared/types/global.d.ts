type AvailableQueryMap = {
  "get-all-support-games": null;
  "get-all": {
    foo: string;
  };
};

type AvailableQuery = keyof AvailableQueryMap;

type QueryParam<T extends AvailableQuery> = AvailableQueryMap[T];

type SupportGame = 'league of legends';