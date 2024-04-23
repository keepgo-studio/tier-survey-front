"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SharedHooks, SharedUtils, SupportGameJsonItem } from "@shared";

const GameItem = ({ item }: { item: SupportGameJsonItem }) => {
  if (item.available) {
    return (
      <div className="rounded-md overflow-hidden">
        <Link href={SharedUtils.generateHostQRUrl(item["game-name"], "new")} draggable={false}>
          <Image
            className="duration-default hover:brightness-75"
            alt="hero"
            width={240}
            height={320}
            src={item["logo-img"]}
            draggable={false}
            priority={true}
          />
        </Link>
      </div>
    );
  }

  return (
    <div className="relative rounded-md overflow-hidden">
      <Image
        className="duration-default brightness-50"
        alt="hero"
        width={240}
        height={320}
        src={item["logo-img"]}
        draggable={false}
        priority={true}
      />
      <h4 className="text-red-400 absolute abcenter">
        Not support yet
      </h4>
    </div>
  );
};

export default function GameList({ data }: { data: SupportGameJsonItem[] }) {
  const { renderSlider } = SharedHooks.useSlider();

  return (
    <section>
      <div className="fcenter">
        <ul className="w-full">
          {renderSlider(
            data.map((item, i) => (
              <li key={i} className="w-fit">
                <GameItem item={item} />
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}
