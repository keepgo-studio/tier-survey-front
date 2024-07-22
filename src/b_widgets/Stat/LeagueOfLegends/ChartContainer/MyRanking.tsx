"use client"

import Entities from "@entities";
import Shared, { SharedApi, Top100PlayerTableItem } from "@shared";
import { useEffect, useState } from "react";
import { ImageTier, Profile, RankType, TextTier } from "./Leaderboards";

export default function MyRanking({ hostHashedId }: { hostHashedId: string; }) {
  const user = Entities.hooks.useAppSelector(Entities.user.selectHashedId);
  const [soloRank, setSoloRank] = useState(-1);
  const [flexRank, setFlexRank] = useState(-1);
  const [info, setInfo] = useState<Top100PlayerTableItem | null>(null)

  useEffect(() => {
    const hashedId = user["league of legends"];
    
    if (!hashedId) return;

    SharedApi.query("getMyRanking", "league of legends", { hashedId, hostHashedId })
      .then(data => {
        if (data) {
          setSoloRank(data.solo);
          setFlexRank(data.flex);
          setInfo(data.info);
        }
      })
  }, [user, hostHashedId]);

  return (
    <Shared.Frame className="!p-8 bg-dark">
      <h4 className="text-bright-gray uppercase">my ranking</h4>
      
      <div className="h-6" />

      <p>
        설문에서의 내 순위
        <br/>
        <span className="text-sm text-bright-gray">UNRANK는 순위에 반영되지 않습니다.</span>
        <br/>
        <span className="text-sm text-bright-gray">이 순위는 나만 볼 수 있습니다.</span>
      </p>
      
      <div className="h-4" />

      {info && (
        <div className="flex flex-col gap-4">
          <Shared.Frame className="grid grid-cols-[auto_1fr_auto] items-center gap-3 text-sm xl:text-base">
            <div className="fcenter"><Profile id={info.profileIconId} /></div>
            <div className="flex items-center">{info.gameName}#{info.tagLine}</div>
            <div className="text-center">
              <Shared.Frame type="small" className="!py-2 !px-4 h-full fcenter">
                <p><span className="text-xs">LV.</span> {info.level}</p>
              </Shared.Frame>
            </div>
          </Shared.Frame>

          <Shared.Frame className="grid grid-cols-[1fr_auto] items-center gap-y-2">
            <div className="flex items-center gap-2 h-full">
              <p className="text-bright-gray text-sm pl-2">solo:</p>
              <p className="h-full fcenter aspect-square">#{info.tierNumeric > 0 ? soloRank : "-"}</p>
            </div>
            
            <div className="fcenter gap-3">
              <TextTier numericTier={info.tierNumeric}/>
              <ImageTier numericTier={info.tierNumeric}/>
            </div>

            <div className="flex items-center gap-2 h-full">
              <p className="text-bright-gray text-sm pl-2">flex:</p>
              <p className="h-full fcenter aspect-square">#{info.flexTierNumeric > 0 ? flexRank : "-"}</p>
            </div>
            
            <div className="fcenter gap-3">
              <TextTier numericTier={info.flexTierNumeric}/>
              <ImageTier numericTier={info.flexTierNumeric}/>
            </div>
          </Shared.Frame>
        </div>
      )}



    </Shared.Frame>
  );
}
