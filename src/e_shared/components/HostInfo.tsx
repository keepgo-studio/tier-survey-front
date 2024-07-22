"use client";

import React, { useEffect, useState } from "react";
import Frame from "./Frame";
import { query } from "../api/query";
import Spinner from "./Spinner";
import Image from "next/image";
import { SupportGameJsonItem } from "../api/nextHandler";
import { CDN_URL } from "../utils/vars";

export default function HostInfo({
  hashedId,
  gameInfo,
}: {
  hashedId: string;
  gameInfo: SupportGameJsonItem;
}) {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("Unkown");
  const [iconId, setIconId] = useState<number>(-1);

  useEffect(() => {
    setLoading(true);

    query("getUser", gameInfo["game-name"], { hashedId }).then((user) => {
      if (!user) return;

      setName(user.gameName);
      setIconId(user.profileIconId);
    })
    .finally(() => setLoading(false));
  }, [gameInfo, hashedId]);

  return (
    <Frame className="bg-dark-black">
      {loading ? (
        <Spinner />
      ) : (
        <section className="flex flex-col sm:flex-row gap-4 p-2 items-center">
          <Frame type="small" className="relative !w-[60px] !h-[60px] p-[10px] !rounded-xl !bg-dark">
            {iconId !== -1 ? (
              <Image
                src={`${CDN_URL[gameInfo["game-name"]]}/${iconId}.png`}
                alt="profile-icon"
                width={36}
                height={36}
                className="abcenter rounded-lg"
              />
            ) : (
              <div className="abcenter">
                <Image
                src="/person.fill.svg"
                alt="profile-default-icon"
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
            <h4 className="text-sm sm:text-lg mb-1">{name}</h4>
            <p className="text-[8px] sm:text-xs text-bright-gray font-light capitalize">{gameInfo["game-name"]}</p>
          </div>
        </section>
      )}
    </Frame>
  );
}
