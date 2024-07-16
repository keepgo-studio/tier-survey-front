const TIER_MAP = new Map<LeagueOfLegendsTier, number>([
  [ "CHALLENGER", 31 ],
  [ "GRANDMASTER", 30 ],
  [ "MASTER", 29 ],
  [ "DIAMOND", 25 ],
  [ "EMERALD", 21 ],
  [ "PLATINUM", 17 ],
  [ "GOLD", 13 ],
  [ "SILVER", 9 ],
  [ "BRONZE", 5 ],
  [ "IRON", 1 ],
]);

const rankText: LeagueOfLegendsRank[] = ["IV", "III", "II", "I"];

export const generateTierRank = (tierNumeric: number) => {
  const result = {
    tier: "UNRANK", 
    division: ""
  };

  for (const [key, val] of TIER_MAP) {
    if (tierNumeric >= val) {
      result.tier = key;
      result.division = rankText[tierNumeric - val];
      break;
    }
  }

  if (tierNumeric >= TIER_MAP.get("MASTER")!) {
    result.division = "";
  }

  return result;
}