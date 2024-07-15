"use client";

import React, { useEffect, useState } from "react";
import Frame from "./Frame";
import { query } from "@shared-inner/api/query";
import Spinner from "./Spinner";
import Image from "next/image";
import { SupportGameJsonItem } from "@shared-inner/api/nextHandler";

export default function HostInfo({
  hashedId,
  gameInfo,
}: {
  hashedId: string;
  gameInfo: SupportGameJsonItem;
}) {
  const CDN_URL =
    "https://ddragon.leagueoflegends.com/cdn/14.6.1/img/profileicon";

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("Unkown");
  const [iconId, setIconId] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);

    query("get-user", gameInfo["game-name"], { hashedId }).then((user) => {
      if (!user) return;

      setName(user.name);
      setIconId(user.profileIconId);
    })
    .finally(() => setLoading(false));
  }, [gameInfo, hashedId]);

  return (
    <Frame className="!w-[320px]">
      {loading ? (
        <Spinner />
      ) : (
        <section className="flex gap-4 p-2 items-center">
          <Frame type="small" className="relative !w-[60px] !h-[60px] p-[10px] !rounded-xl !bg-[#18181C]">
            {iconId ? (
              <Image
                src={`${CDN_URL}/${iconId}.png`}
                alt="profile-icon"
                width={36}
                height={36}
                className="abcenter rounded-lg"
              />
            ) : (
              <div className="abcenter">
                <Image
                src="/person.fill.svg"
                alt="profile-icon"
                width={24}
                height={24}
                />

                <div className="h-1"/>

                <div style={{
                  backgroundColor: gameInfo["theme-color"],
                  width: "100%",
                  height: '3px',
                  borderRadius: '999px'
                }} />
              </div>
            )}
          </Frame>

          <div className="flex-1">
            <h4 className="text-lg mb-1">{name}</h4>
            <p className="text-xs text-bright-gray font-light capitalize">{gameInfo["game-name"]}</p>
          </div>
        </section>
      )}
    </Frame>
  );
}
