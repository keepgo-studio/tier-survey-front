"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SharedHooks, SharedUtils, SupportGameJsonItem } from "@shared";

const GameItem = ({ item }: { item: SupportGameJsonItem }) => {
  const width = 280, height = 360;

  if (item.available) {
    return (
      <Link
        href={SharedUtils.generateHostQRUrl(item["game-name"])}
        draggable={false}
      >
        <div className="relative rounded-md overflow-hidden group">
          <Image
            className="duration-default group-hover:brightness-75"
            alt="hero"
            width={width}
            height={height}
            src={item["logo-img"]}
            draggable={false}
            priority={true}
          />

          <h4 className="fcenter text-white absolute left-0 top-0 h-full bg-black bg-opacity-20 text-sm w-full opacity-0 group-hover:opacity-100 duration-150">
            start survey
          </h4>
        </div>
      </Link>
    );
  }

  return (
    <div className="relative rounded-md overflow-hidden">
      <Image
        className="duration-default brightness-[0.2]"
        alt="hero"
        width={width}
        height={height}
        src={item["logo-img"]}
        draggable={false}
        priority={true}
      />

      <h4 className="text-red-500 abcenter bg-black p-4 w-4/5 text-sm text-center">
        Not support yet
      </h4>
    </div>
  );
};

export default function GameList({ data }: { data: SupportGameJsonItem[] }) {
  const { renderSlider } = SharedHooks.useSlider();

  return (
    <section className="w-full h-full fcenter">
      <ul className="w-full">
        {renderSlider(
          data.map((item, i) => (
            <li key={i} className="w-fit">
              <GameItem item={item} />
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
