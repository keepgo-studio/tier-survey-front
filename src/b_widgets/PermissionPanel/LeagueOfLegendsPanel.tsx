"use client"

import React, { useState } from "react";
import Shared, { SharedUtils } from "@shared";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Item = {
  apiType: SupportApiType;
  apiLink: string | null;
  types: string[];
  required: boolean;
};

function PanelItem({
  item,
  onCheck
}: {
  item: Item;
  onCheck: (checked: boolean) => void;
}) {
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
        {item.types.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>

      <input
        disabled={item.required}
        type="checkbox"
        onChange={(e) => onCheck(e.currentTarget.checked)}
      />
    </div>
  );
}

function Panel() {
  const itemList: Item[] = [
    {
      apiType: "SUMMONER-V4",
      apiLink: "https://developer.riotgames.com/apis#summoner-v4",
      types: ["summoner's name", "summoner's level"],
      required: true
    },
    {
      apiType: "LEAGUE-V4",
      apiLink: "https://developer.riotgames.com/apis#league-v4",
      types: ["solo rank tier"],
      required: true
    },
    {
      apiType: "CHAMPION-MASTERY-V4",
      apiLink: "https://developer.riotgames.com/apis#champion-mastery-v4",
      types: ["most loved champion"],
      required: true
    },
    {
      apiType: "GEO-LOCATION",
      apiLink: null,
      types: ["most loved champion"],
      required: false
    },
  ];

  const hashedId = useSearchParams().get("hashedId"),
        gameName = useSearchParams().get("gameName");

  const [panelState, setPanelState] = useState(itemList.map((item) => ({
    apiType: item.apiType,
    confirm: item.required
  })));

  const generateUrl = () => {
    if (!hashedId || !gameName) return "";

    const confirmList = panelState.filter(t => t.confirm),
          param = confirmList.map(t => t.apiType);
    
    return SharedUtils.getQuery("/participant/progress", {
      api: JSON.stringify(param),
      hashedId,
      gameName,
    });
  }

  return (
    <section>
      <h2>Permission types</h2>

      <ul>
        {itemList.map((item, idx) => (
          <li key={idx}>
            <PanelItem onCheck={checked => setPanelState(prev => {
              prev[idx].confirm = checked;
              return [...prev];
            })} item={item} />
          </li>
        ))}
      </ul>

      <Link href={generateUrl()}>Confirm</Link>
    </section>
  );
}

export default function LeagueOfLegendsPanel() {

  return (
    <>
      <Shared.Container>League Of Legends Permission Panel</Shared.Container>
      <Panel />
    </>
  );
}
