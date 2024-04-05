"use client";

import Image from "next/image";

export const ProfileIcon = ({ iconId }: { iconId: number }) => {
  return (
    <Image
      src={`https://ddragon.leagueoflegends.com/cdn/14.6.1/img/profileicon/${iconId}.png`}
      alt="icon-image"
      width={120}
      height={120}
    />
  );
};

export const Tier = ({ tierNumeric }: { tierNumeric: number }) => {
  const tierMap = new Map<LeagueOfLegendsTier, number>([
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

  const generateTierRank = () => {
    const result = ["UNRANK", ""];

    for (const [key, val] of tierMap) {
      if (tierNumeric >= val) {
        result[0] = key;
        result[1] = rankText[tierNumeric - val];
        break;
      }
    }

    if (tierNumeric >= tierMap.get("MASTER")!) {
      result[1] = "";
    }

    return result;
  }

  const [tier, rank] = generateTierRank();

  return (
    <div>
      <Image
        src={`/data/ranked-emblems/league-of-legends/${tier}.webp`}
        alt="tier-image"
        width={80}
        height={80}
      />
      <p>{rank}</p>
    </div>
  );
};
