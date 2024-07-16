"use  client";

import React, { useEffect, useState } from "react";
import Shared, { SharedApi, SharedUtils, SupportGameJsonItem } from "@shared";
import Image from "next/image";
import Link from "next/link";
import { StatProps } from "../../Stat";

export default function GameList({ gameInfo, hashedId }: StatProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<SupportGameJsonItem[]>([]);

  useEffect(() => {
    setLoading(true);

    SharedApi.serverQuery("get-all-support-games", null)
      .then((_data) => setData(_data))
      .finally(() => setLoading(false));
  }, []);

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
            <li key={item["game-name"]}>
              {item.available ? (
                <Link
                  href={SharedUtils.generateStatUrl(
                    hashedId,
                    item["game-name"]
                  )}
                >
                  <Item {...item} isCurrent={gameInfo["game-name"] === item["game-name"]} />
                </Link>
              ) : (
                <Item {...item} isCurrent={gameInfo["game-name"] === item["game-name"]} />
              )}
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
    <Shared.Frame className={"relative overflow-hidden" + " " + (isCurrent ? "clickable" : "text-gray")}>
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

      {isCurrent && <div className="absolute top-0 left-0 right-0 bottom-0 opacity-50" style={{ backgroundColor: item["theme-color"] }}/>}
    </Shared.Frame>
  );
}
