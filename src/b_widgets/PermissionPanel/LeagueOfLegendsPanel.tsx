import Shared from "@shared";
import Link from "next/link";
import React from "react";

type Item = {
  apiType: string;
  apiLink: string | null;
  types: string[];
};

function PanelItem({ item }: { item: Item }) {
  return (
    <div>
      {item.apiLink ? (
        <Link href={item.apiLink} target="_blank">
          <h3>{item.apiType}</h3>
        </Link>
      ) : (
        <h3>{item.apiType}</h3>
      )}

      <ul>
        {item.types.map((t, idx) => (
          <li key={idx}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

// tier: string;
// level: number;
// champions: LeagueOfLegendsChampion[];
// surveyList: RSOHashedId[]; // 참여한 설문 리스트들
// updateDate: Date;
// geo: { latitude: number; longitude: number } | null;
function Panel() {
  const itemList: Item[] = [
    {
      apiType: "SUMMONER-V4",
      apiLink: "https://developer.riotgames.com/apis#summoner-v4",
      types: ["summoner's name", "summoner's level"],
    },
    {
      apiType: "LEAGUE-V4",
      apiLink: "https://developer.riotgames.com/apis#league-v4",
      types: ["solo rank tier"],
    },
    {
      apiType: "CHAMPLION_MASTERY-V4",
      apiLink: "https://developer.riotgames.com/apis#champion-mastery-v4",
      types: ["most loved champion"],
    },
    {
      apiType: "GEO LOCATION",
      apiLink: null,
      types: ["most loved champion"],
    },
  ];

  return (
    <section>
      <h2>Permission types</h2>

      <ul>
        {itemList.map((item, idx) => (
          <li key={idx}>
            <PanelItem item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function LeagueOfLegendsPanel({
  hostHashed,
}: {
  hostHashed: string;
}) {
  return (
    <>
      <Shared.Container>League Of Legends Permission Panel</Shared.Container>

      <Panel />
    </>
  );
}
