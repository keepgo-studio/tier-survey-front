"use client";

import Shared, { PlayerTableItem, SharedApi, SharedBrowserUtils } from "@shared";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { generateTierRank } from "../utils";
import Entities from "@entities";
import Auth from "src/b_widgets/Auth/Auth";
import { StatProps } from "../../Stat";
import MiniPermission from "./MiniPermission";

export default function PersonalTier({ gameInfo, hashedId: hostHashedId }: StatProps) {
  const currentHashedIdMap = Entities.hooks.useAppSelector(
    Entities.user.selectHashedId
  );
  const hashedId = currentHashedIdMap[gameInfo["game-name"]];
  const [surveyExist, setSurveyExist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<PlayerTableItem | null>(null);

  useEffect(() => {
    if (!hashedId) return;

    setLoading(true);
    SharedApi.query("getMyInfoFromPlayerTable", gameInfo["game-name"], {
      hostHashedId, hashedId,
    })
      .then((data) => {
        if (!data) return;
        setInfo(data);
        setSurveyExist(true);
      })
      .finally(() => setLoading(false));
  }, [gameInfo, hostHashedId, hashedId]);

  if (!hashedId) {
    return (
      <Shared.Frame className="!p-4 bg-dark-black flex flex-col gap-2">
        <div className="uppercase text-xs rounded-full border border-border bg-dark py-2 px-3 text-red flex gap-2 justify-center">
          You Haven&apos;t login
        </div>

        <div className="w-full fcenter py-2">
          <Auth game={gameInfo["game-name"]} />
        </div>
      </Shared.Frame>
    );
  }

  const isHost = hashedId === hashedId;

  const renderStat = () => {
    if (loading) return <Shared.Spinner />;

    if (!surveyExist) {
      return (
        <div className="uppercase text-xs rounded-full border border-border bg-dark py-2 px-3 text-red flex gap-2 justify-center">
          설문이 없습니다.
        </div>
      )
    }

    if (!info) {
      return (
        <>
          <div className="uppercase text-xs rounded-full border border-border bg-dark py-2 px-3 text-red flex gap-2 justify-center">
            참여한 적이 없는 설문입니다.
          </div>
          {isHost && (
            <MiniPermission
              currentGame={gameInfo["game-name"]}
              hashedId={hashedId}
              hostHashedId={hashedId}
            />
          )}
        </>
      );
    }

    return (
      <section className="w-full flex flex-col gap-2">
        <Shared.HostInfo gameInfo={gameInfo} hashedId={hashedId} />
        <Level color={gameInfo["theme-color"]} level={info.level} />
        <Tier type="solo" numericTier={info.tierNumeric} />
        <Tier type="flex" numericTier={info.flexTierNumeric} />
      </section>
    );
  };

  return (
    <Shared.Frame className="!p-4 bg-dark-black fcenter flex-col gap-3 h-full">
      {renderStat()}
    </Shared.Frame>
  );
}

function Update({ time }: { time: number }) {
  return (
    <div className="uppercase text-xs rounded-full border border-border py-2 px-3 bg-dark text-bright-gray flex gap-2 justify-center">
      <span>joined at</span>
      {time && <span>{new Date(time).toISOString().slice(0, 10)}</span>}
    </div>
  );
}

function Level({ color, level }: { color: string; level: number }) {
  return (
    <div className="p-2">
      <p className="text-lg" style={{ color }}>
        Lv.
      </p>

      <div className="h-1" />

      <h4 className="text-3xl">{level}</h4>
    </div>
  );
}

function Tier({
  type,
  numericTier,
}: {
  type: "solo" | "flex";
  numericTier: number;
}) {
  const tier = generateTierRank(numericTier);

  return (
    <Shared.Frame className="!p-4 flex items-center justify-between">
      <div>
        <p className="uppercase text-xs text-bright-gray">{type} rank</p>

        <div className="h-1" />

        <p>{tier.tier}</p>
      </div>

      <Shared.Frame className="!w-fit bg-dark !p-[10px] fcenter">
        <Image
          src={`/data/ranked-emblems/league-of-legends/${tier.tier}.webp`}
          alt="tier-image"
          width={56}
          height={56}
        />
      </Shared.Frame>
    </Shared.Frame>
  );
}
