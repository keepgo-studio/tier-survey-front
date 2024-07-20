"use client";

import React, { useEffect, useState } from "react";
import Shared, { SharedApi, SharedUtils, SupportGameJsonItem } from "@shared";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function GameList({
  init,
  hashedId,
  onSelect,
}: {
  init?: SupportGameJsonItem;
  hashedId?: string;
  onSelect?: (game: SupportGame | null) => void;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [currentGameInfo, setCurrentGameInfo] = useState(init);
  const [data, setData] = useState<SupportGameJsonItem[]>([]);

  useEffect(() => {
    setLoading(true);

    SharedApi.serverQuery("get-all-support-games", null)
      .then((_data) => setData(_data))
      .finally(() => setLoading(false));
  }, []);

  const fireSelect = (game: SupportGame | undefined) => {
    if (!onSelect) return;

    onSelect(game ?? null);
  };

  if (loading) return <Shared.Spinner />;

  return (
    <Shared.Frame className="!p-4 bg-dark-black">
      <h4 className="uppercase text-lg">games</h4>

      <div className="h-4" />

      {loading ? (
        <Shared.Spinner />
      ) : (
        <ul className="flex flex-col gap-2">
          {data.map((item) => (
            <li
              key={item["game-name"]}
              onClick={() => {
                if (!item.available) return;

                const info =
                  currentGameInfo?.["game-name"] === item["game-name"]
                    ? undefined
                    : item;

                if (init === undefined) {
                  setCurrentGameInfo(info);
                }
                fireSelect(info?.["game-name"]);

                if (hashedId) {
                  router.push(SharedUtils.generateStatUrl(hashedId, item["game-name"]));
                }
              }}
            >
              <Item
                {...item}
                isCurrent={Boolean(
                  currentGameInfo &&
                    currentGameInfo["game-name"] === item["game-name"]
                )}
              />
            </li>
          ))}
        </ul>
      )}
    </Shared.Frame>
  );
}

function Item({
  isCurrent,
  ...item
}: SupportGameJsonItem & { isCurrent: boolean }) {
  return (
    <Shared.Frame
      className={
        "relative overflow-hidden" +
        " " +
        (isCurrent ? "" : "text-gray") +
        " " +
        (item.available ? "clickable" : "")
      }
    >
      <div className="flex items-center gap-2 text-xs uppercase relative z-10">
        <Shared.Frame
          type="small"
          className="!p-[6px] fcenter aspect-square !w-fit bg-dark"
        >
          <Image
            src={`/data/img/${SharedUtils.toKebabCase(
              item["game-name"]
            )}-icon.png`}
            alt="icon"
            width={14}
            height={14}
          />
        </Shared.Frame>
        <span className="flex-1">{item["game-name"]}</span>
        {!item.available && <span className="px-1 text-[10px]">❌</span>}
      </div>

      {isCurrent && (
        <div
          className="absolute top-0 left-0 right-0 bottom-0 opacity-50"
          style={{ backgroundColor: item["theme-color"] }}
        />
      )}
    </Shared.Frame>
  );
}
