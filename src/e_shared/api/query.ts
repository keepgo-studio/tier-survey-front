import firebaseHandler from "./firebaseHandler";
import nextHandler from "./nextHandler";

// Define the return types for each query
type QueryReturnType<T extends AvailableQuery> =
  T extends 'get-all-support-games' ? ReturnType<typeof nextHandler.getAllSupportGames> :
  T extends 'book-survey' ? ReturnType<typeof firebaseHandler.getSurveyUrl> :
  never;

export default function query<T extends AvailableQuery> (
  query: T,
  params: QueryParam<T>
): QueryReturnType<T> {
  if (query === 'get-all-support-games') {
    return nextHandler.getAllSupportGames() as QueryReturnType<T>;
  } else if (query === 'book-survey' && params) {
    return firebaseHandler.getSurveyUrl(params) as QueryReturnType<T>;
  }
  
  throw new Error("Wrong query, check" + query);
}