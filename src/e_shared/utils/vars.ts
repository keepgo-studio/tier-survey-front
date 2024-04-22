export const NEXT_API_URL = process.env.NODE_ENV === 'development'
  ? "http://localhost:3000"
  : "https://tier-survey.xyz";

export const NEXT_PROD_API_URL = "https://tier-survey.xyz";

export const FB_API_URL = process.env.NODE_ENV === 'development'
  ? "http://127.0.0.1:5001/tier-survey/asia-northeast3"
  : "https://asia-northeast3-tier-survey.cloudfunctions.net";

export class Ease {
  static easeOutExpo(x: number) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  }
}

export const IS_DEV = process.env.NODE_ENV === "development";