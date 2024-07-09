"use client"

import React, { useEffect } from 'react'
import Shared, { SharedHooks, SharedUtils, SupportGameJsonItem } from '@shared';
import Link from 'next/link';
import Image from 'next/image';
import { FaBan } from "react-icons/fa6";

export default function GameSelect({ data }: { data: SupportGameJsonItem[] }) {
  const { renderSlider, currentIdx } = SharedHooks.useSlider();

  useEffect(() => {}, [data]);

  return (
    <section className='w-full'>
      <h4 className='uppercase text-xl py-1 flex items-center gap-2'>
        <i className='block w-3 h-[1em]' style={{
          backgroundColor: `${data[currentIdx]['theme-color']}`
        }} />
        <span>{data[currentIdx]['game-name']}</span>
        <span>{data[currentIdx]['available'] ? '' : '❌'}</span>
      </h4>

      <div className='h-6'/>

      <Shared.Frame type='large' className='!py-6 !px-0 bg-dark-black'>
        <ul className="w-full h-full">
          {renderSlider(
            data.map((item, i) => (
              <li key={i}>
                <GameItem item={item} />
              </li>
            ))
          )}
        </ul>
      </Shared.Frame>
    </section>
  )
}

const GameItem = ({ item }: { item: SupportGameJsonItem }) => {
  return (
      <Link
        className={`w-72 h-96 block ${item.available ? 'clickable' : 'cursor-not-allowed'}`}
        href={item.available ? SharedUtils.generateHostQRUrl(item["game-name"]) : ''}
        draggable={false}
      >
        <Shared.Frame className='relative w-full h-full overflow-hidden'>
          <Image
            className="object-cover"
            alt="hero"
            fill
            src={item["logo-img"]}
            draggable={false}
            priority={true}
          />

          {item.available ? '' : (
            <div className='absolute top-0 left-0 bottom-0 right-0 backdrop-blur-sm bg-black bg-opacity-75 fcenter'>
              <Shared.Frame type='small' className='uppercase !w-fit !p-4 bg-dark-black text-red flex items-center gap-2'>
                <FaBan /> 
                <span className='text-xs'>not support yet</span>
              </Shared.Frame>
            </div>
          )}
        </Shared.Frame>
      </Link>
  )
};