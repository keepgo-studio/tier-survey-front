"use client"

import { SupportGameJsonItem } from "@shared";
import React from "react";

export default function Title({
  children,
  gameInfo,
}: {
  children: React.ReactNode;
  gameInfo?: SupportGameJsonItem;
}) {
  return (
    <section>
      <h1 className='uppercase text-bright-gray text-4xl font-light w-full'>
        {children}
      </h1>

      <div className='h-6' />

      {gameInfo && (
        <>
          <h4 className='uppercase text-xl py-1 flex items-center gap-2'>
            <i className='block w-3 h-[1em]' style={{
              backgroundColor: `${gameInfo['theme-color']}`
            }} />
            <span>{gameInfo['game-name']}</span>
          </h4>

          <div className='h-6'/>
        </>
      )}
    </section>
  );
}
