'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SharedHooks, SupportGameJsonItem } from '@shared'

const GameItem = ({ item }: { item: SupportGameJsonItem }) => {
  return (
    <div className="rounded-md overflow-hidden duration-default hover:brightness-75">
      <Link href={'/qr?hashed-id=123'} draggable={false}>
        <Image alt='hero' width={240} height={320} src={item['logo-img']} draggable={false}/>
      </Link>
    </div>
  )
}

export default function GameList({
  data
}: {
  data: SupportGameJsonItem[]
}) {
  const { moveNext, movePrev, renderSlider } = SharedHooks.useSlider();

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

      <button onClick={() => moveNext()}>next</button>
      <button onClick={() => movePrev()}>prev</button>
    </section>
  )
}
