import firebaseHandler from "../api/firebaseHandler";
import nextHandler from "../api/nextHandler";

export default function useQuery<T extends AvailableQuery> (
  query: T,
  params: QueryParam<T>
) {
  switch(query) {
    case "get-all-support-games":
      return nextHandler.getAllSupportGames();
    case "get-qr-code-url":
      // [x] firebsae getQRCode
      if (!params) 
        throw new Error('pass correct params for firebaseHandler.getSurveyUrl: {"keyword": string; "limit-minute": number; }');
      return firebaseHandler.getSurveyUrl(params);
    // return '/qr/client/{hashed-id}'
    default: throw new Error("Wrong query");
  }
}