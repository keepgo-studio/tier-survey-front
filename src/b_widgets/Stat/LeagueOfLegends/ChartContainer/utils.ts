export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export async function getChampionNameMap(): Promise<Record<string, string>> {
  const championMap = await fetch("/data/champion-map.json").then(res => res.json());

  return championMap;
}

export const colorArr = [
  "#000",
  "#3D2C2B",
  "#653032",
  "#A7B7C4",
  "#A56E2C",
  "#0e537d",
  "#096b3e",
  "#4086ff",
  "#eb43fe",
  "#f43f3d",
  "#687dee"
];

export type TierTypes = LeagueOfLegendsTier | "UNRANK";

export const orderTier: TierTypes[] = [
  "UNRANK",
  "IRON",
  "BRONZE",
  "SILVER",
  "GOLD",
  "PLATINUM",
  "EMERALD",
  "DIAMOND",
  "MASTER",
  "GRANDMASTER",
  "CHALLENGER",
]

export function getMaxTiers(data :Record<TierTypes, number>) {
  let maxVal = 0, tierArr: TierTypes[] = [];

  Object.entries(data).forEach(([_t, cnt]) => {
    if (cnt === 0 || maxVal > cnt) return;

    const tier = _t as TierTypes;

    if (maxVal > 0 && maxVal === cnt) tierArr.push(tier);

    maxVal = cnt;
    tierArr = [tier];
  })

  return tierArr;
}