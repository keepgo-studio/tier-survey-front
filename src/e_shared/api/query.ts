import * as firebaseHandler from "./firebaseHandler";

// Define the return types for each query
type QueryReturnType<T extends AvailableQuery> = 
  T extends "create-survey" ? ReturnType<typeof firebaseHandler.getSurveyUrl> : 
  T extends "check-survey" ? ReturnType<typeof firebaseHandler.checkSurvey> :
  T extends "save-league-of-legends-stat" ? ReturnType<typeof firebaseHandler.saveLeagueOfLegendsStat> :
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
    case "save-league-of-legends-stat":
      return firebaseHandler.saveLeagueOfLegendsStat(
        param as QueryParam<"save-league-of-legends-stat">
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
