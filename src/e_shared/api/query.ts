import * as firebaseHandler from "./firebaseHandler";

// Define the return types for each query
type QueryReturnType<T extends AvailableQuery> = 
  T extends "create-survey" ? ReturnType<typeof firebaseHandler.getSurveyUrl> : 
  T extends "check-survey" ? ReturnType<typeof firebaseHandler.checkSurvey> :
  T extends "save-stat" ? ReturnType<typeof firebaseHandler.saveStat> :
  T extends "join-survey" ? ReturnType<typeof firebaseHandler.joinSurvey> :
  T extends "check-join-survey" ? ReturnType<typeof firebaseHandler.checkJoinSurvey> :
  T extends "get-user" ? ReturnType<typeof firebaseHandler.getUser> :
  T extends "get-stat" ? ReturnType<typeof firebaseHandler.getStat> :
  T extends "get-chart" ? ReturnType<typeof firebaseHandler.getChart> :
  never;

export function query<T extends AvailableQuery>(
  query: T,
  game: SupportGame,
  param: QueryParam<T>
): QueryReturnType<T> {
  switch(query) {
    case "check-survey":
      return firebaseHandler.checkSurvey(
        game,
        param as QueryParam<"check-survey">
      ) as QueryReturnType<T>;
    case "create-survey":
      return firebaseHandler.getSurveyUrl(
        game,
        param as QueryParam<"create-survey">
      ) as QueryReturnType<T>;
    case "save-stat":
      return firebaseHandler.saveStat(
        game,
        param as QueryParam<"save-stat">
      ) as QueryReturnType<T>;
    case "join-survey":
      return firebaseHandler.joinSurvey(
        game,
        param as QueryParam<"join-survey">
      ) as QueryReturnType<T>;
    case "check-join-survey":
      return firebaseHandler.checkJoinSurvey(
        game,
        param as QueryParam<"check-join-survey">
      ) as QueryReturnType<T>;
    case "get-user":
      return firebaseHandler.getUser(
        game,
        param as QueryParam<"get-user">
      ) as QueryReturnType<T>;
    case "get-stat":
      return firebaseHandler.getStat(
        game,
        param as QueryParam<"get-stat">
      ) as QueryReturnType<T>;
    case "get-chart":
      return firebaseHandler.getChart(
        game,
        param as QueryParam<"get-chart">
      ) as QueryReturnType<T>;
    default:
      throw new Error("[query] Wrong query, check" + query);
  }
}


import * as nextHandler from "./nextHandler";

// Define the return types for each server query
type ServerQueryReturnType<T extends AvailableServerQuery> =
  T extends "get-all-support-games" ? ReturnType<typeof nextHandler.getAllSupportGames>
  : never;

export function serverQuery<T extends AvailableServerQuery>(
  query: T,
  param: ServerQueryParam<T>
): ServerQueryReturnType<T> {
  if (query === "get-all-support-games") {
    return nextHandler.getAllSupportGames() as ServerQueryReturnType<T>;
  }

  throw new Error("[serverQuery] Wrong query, check" + query);
}
