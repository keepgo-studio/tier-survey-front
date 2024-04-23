"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Shared, { SharedApi, SharedUtils } from "@shared";
import Entities from "@entities";
import { ProfileIcon, Tier } from "./utils";

export default function UserInfo({
  hashedId,
}: {
  hashedId: string;
}) {
  const currentHashedId = Entities.hooks.useAppSelector(
    Entities.user.selectHashedId
  );

  const [name, setName] = useState("Unkown");
  const [tierNumeric, setTierNumeric] = useState(0);
  const [level, setLevel] = useState(0);
  const [iconId, setIconId] = useState(7);

  const isHost = currentHashedId === hashedId;

  useEffect(() => {
    SharedApi.query("get-user", "league of legends", {
      hashedId
    }).then(user => {
      if (!user) return;

      setLevel(user.level);
      setIconId(user.profileIconId);
      setName(user.name);
    });

    SharedApi.query("get-stat", "league of legends", {
      hashedId
    }).then(async stat => {
      if (!stat) return;

      setTierNumeric(stat.tierNumeric);
    })
  }, [hashedId]);

  return (
    <section>
      {isHost && (
        <div className="flex justify-end">
          <Link href={SharedUtils.generateHostQRUrl("league of legends", "new")}>
            <Shared.Button>make survey again</Shared.Button>
          </Link>
        </div>
      )}

      <div className="grid grid-cols-[auto_1fr]">
        <ProfileIcon iconId={iconId}/>

        <div>
          <h1>{name}</h1>

          <h3>{level}</h3>

          <Tier tierNumeric={tierNumeric}/>
        </div>
      </div>
    </section>
  );
}
