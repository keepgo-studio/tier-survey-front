export const NEXT_API_URL = process.env.NODE_ENV
  ? "http://localhost:3000"
  : "https://tier-survey.xyz/";


export class Ease {
  static easeOutExpo(x: number) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  }
}