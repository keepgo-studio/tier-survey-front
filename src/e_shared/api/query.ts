import * as firebaseHandler from "./firebaseHandler";

// Define the return types for each query
type QueryReturnType<T extends AvailableQuery> =
  T extends 'book-survey' ? ReturnType<typeof firebaseHandler.getSurveyUrl> :
  never;

export function query<T extends AvailableQuery> (
  query: T,
  params: QueryParam<T>
): QueryReturnType<T> {
  if (query === 'book-survey' && params) {
    return firebaseHandler.getSurveyUrl(params) as QueryReturnType<T>;
  }
  
  throw new Error("Wrong query, check" + query);
}


import * as nextHandler from "./nextHandler";

// Define the return types for each server query
type ServerQueryReturnType<T extends AvailableServerQuery> =
  T extends 'get-all-support-games' ? ReturnType<typeof nextHandler.getAllSupportGames> :
  never;

export function serverQuery<T extends AvailableServerQuery>(
  query: T,
  params: ServerQueryParam<T>
): ServerQueryReturnType<T> {
  if (query === 'get-all-support-games') {
    return nextHandler.getAllSupportGames() as ServerQueryReturnType<T>;
  }

  throw new Error("Wrong query, check" + query);
}