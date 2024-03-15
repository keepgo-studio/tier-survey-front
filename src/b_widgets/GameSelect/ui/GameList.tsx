'use client'

import React from 'react'
import { SharedHooks } from '@/e_shared'

import type { SupportGameJsonItem } from '@/e_shared/types/api'

const GameItem = ({ item }: { item: SupportGameJsonItem }) => {
  return (
    <div className="rounded-md overflow-hidden">
      <img className='w-60 h-80' src={item['logo-img']} draggable={false}/>
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
      <ul>
        {renderSlider(data.map((item, i) => (
          <li key={i} className='w-fit'>
            <GameItem item={item}/>
          </li>
        )))}
      </ul>

      <button onClick={() => moveNext()}>next</button>
      <button onClick={() => movePrev()}>prev</button>
    </section>
  )
}
