import * as firebaseHandler from "./firebaseHandler";

type FirebaseAPI<T extends keyof typeof firebaseHandler> = typeof firebaseHandler[T];

type QueryReturnType<T extends AvailableQuery> = ReturnType<FirebaseAPI<T>>;

export function query<T extends AvailableQuery>(
  type: T,
  game: SupportGame,
  param: QueryParam<T>
): QueryReturnType<T> {
  return firebaseHandler[type](game, param as any) as QueryReturnType<T>;
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

  throw new Error("[serverQuery]: Wrong query, check" + query);
}
