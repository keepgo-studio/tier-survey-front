import nextHandler from "../api/nextHandler";

export default function useQuery<T extends AvailableQuery> (
  query: T,
  params: QueryParam<T>
) {
  switch(query) {
    case "get-all-support-games":
      return nextHandler.getAllSupportGames();
    default: throw new Error("Wrong query");
  }
}