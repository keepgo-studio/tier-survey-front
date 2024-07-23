"use client";

import Shared, {
  SharedApi,
  SharedUtils,
  SupportGameJsonItem,
  Top100PlayerTable,
  Top100PlayerTableItem,
} from "@shared";
import Image from "next/image";
import { useEffect, useReducer, useState } from "react";
import { generateTierRank } from "../utils";

export type RankType = "solo" | "flex";

export default function Leaderboards({
  gameInfo,
  hashedId,
}: {
  gameInfo: SupportGameJsonItem;
  hashedId: string;
}) {
  const [rankType, setRankType] = useState<RankType>("solo");
  const [data, setData] = useState<Top100PlayerTable>({ flex: [], solo: [] });

  useEffect(() => {
    SharedApi.query("getTop100PlayerTable", gameInfo["game-name"], {
      hashedId,
    }).then((data) => {
      if (!data) return; 
      setData({ ...data });
    });
  }, [hashedId, gameInfo]);

  return (
    <Shared.Frame className="!p-8 bg-dark">
      <h4 className="text-bright-gray uppercase">top 100</h4>

      <div className="h-6" />

      <p className="leading-7">
        현재 설문의 상위 100명 플레이어 정보입니다.
        <br/>
        <span className="text-sm text-bright-gray">UNRANK는 순위에 반영되지 않습니다.</span>
      </p>


      <div className="h-4" />

      <div className="flex items-center gap-2">
        <Shared.Button
          className="uppercase"
          style={{
            backgroundColor: (rankType === "solo" ? gameInfo["theme-color"] : "#292929")
          }}
          onClick={() => setRankType("solo")}
        >
          solo
        </Shared.Button>
        <Shared.Button
          className="uppercase"
          style={{
            backgroundColor: (rankType === "flex" ? gameInfo["theme-color"] : "#292929")
          }}
          onClick={() => setRankType("flex")}
        >
          flex
        </Shared.Button>
      </div>

      <div className="h-8" />

      <Table data={data[rankType]} type={rankType} />
    </Shared.Frame>
  );
}

function Table({ 
  data,
  type
}: { 
  data: Top100PlayerTableItem[];
  type: RankType;
}) {
  type State = {
    n: number;
    idx: number;
    data: Top100PlayerTableItem[];
  };
  
  const reducer = (state: State, action: { type: "select", payload: number; }) => {
    
    switch(action.type) {
      case "select":
        const n = Math.ceil(data.length / 10);
        const start = action.payload * 10;
        return {
          n,
          idx: action.payload,
          data: data.slice(start, start + 10)
        };
      default: return state;
    }
  }

  const initState: State = {
    n: 0,
    idx: 0,
    data: data.slice(0, 10)
  };

  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => { dispatch({ type: "select", payload: 0}); }, [data]);

  return (
    <Shared.Frame className="!p-4">
      <table className="w-full flex flex-col gap-2">
        <tbody>
          {state.data.map((row, idx) => (
            <tr key={`${row.gameName}-${idx}`} className="shadow-border rounded-lg p-2 w-full grid grid-cols-[auto_auto_1fr_auto_auto_auto] items-center gap-3 [&>td]:w-full text-sm xl:text-base">
              <td className="text-sm fcenter aspect-square">#{state.idx * 10 + idx + 1}</td>
              <td className="fcenter"><Profile id={row.profileIconId} /></td>
              <td className="flex items-center">{row.gameName}#{row.tagLine}</td>
              <td className="text-center">
                <Shared.Frame type="small" className="!py-2 !px-4 h-full fcenter">
                  <p><span className="text-xs">LV.</span> {row.level}</p>
                </Shared.Frame>
              </td>
              <td className="text-center">
                <TextTier numericTier={type === 'solo' ? row.tierNumeric : row.flexTierNumeric}/>
              </td>
              <td className="text-center">
                <ImageTier numericTier={type === 'solo' ? row.tierNumeric : row.flexTierNumeric}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="h-8" />

      <ul className="w-full fcenter p-2">
      {[...Array(state.n)].map((_, idx) => (
        <li 
          key={idx} 
          onClick={() => dispatch({ type: "select", payload: idx})} 
          className={idx === state.idx ? "" : "clickable text-bright-gray"}
        >
          {idx + 1}
        </li>
      ))}
      </ul>
    </Shared.Frame>
  );
}

export function Profile({ id }: { id: number; }) {
  return (
    <Shared.Frame type="small" className="relative !w-[48px] !h-[48px] !rounded-xl !bg-dark">
      <Image
        src={`${SharedUtils.CDN_URL["league of legends"]}/${id}.png`}
        alt="profile-icon"
        width={30}
        height={30}
        className="abcenter rounded-lg"
      />
    </Shared.Frame>
  )
}

export function TextTier({ numericTier }: { numericTier: number; }) {
  const { tier, division } = generateTierRank(numericTier);

  return (
    <Shared.Frame type="small" className="!px-4 text-sm !w-[13em] h-full fcenter">
      {tier} {division}
    </Shared.Frame>
  )
}

export function ImageTier({ numericTier }: { numericTier: number; }) {
  const { tier } = generateTierRank(numericTier);

  return (
    <Shared.Frame type="small" className="h-full bg-black w-[48px] aspect-square fcenter">
      <Image
        src={`/data/ranked-emblems/league-of-legends/${tier}.webp`}
        alt="tier-image"
        width={36}
        height={36}
      />
    </Shared.Frame>
  )
}