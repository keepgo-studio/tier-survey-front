'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SharedHooks, SupportGameJsonItem } from '@shared'
import Entities from '@entities'

const GameItem = ({ item }: { item: SupportGameJsonItem }) => {
  const dispatch = Entities.hooks.useAppDispatch();

  return (
    <div 
      className="rounded-md overflow-hidden duration-default hover:brightness-75"
      onClick={() => dispatch(Entities.user.setCurrentGame(item['game-name']))}
    >
      <Link href={'/qr?hashed-id=123'} draggable={false}>
        <Image alt='hero' width={240} height={320} src={item['logo-img']} draggable={false} priority={true} />
      </Link>
    </div>
  )
}

export default function GameList({
  data
}: {
  data: SupportGameJsonItem[]
}) {
  const { renderSlider } = SharedHooks.useSlider();

  return (
    <section>
      <div className='fcenter'>
        <ul className='w-full'>
          {renderSlider(data.map((item, i) => (
            <li key={i} className='w-fit'>
              <GameItem item={item}/>
            </li>
          )))}
        </ul>
      </div>
    </section>
  )
}
