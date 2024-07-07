import React from 'react'
import GameList from './GameList';
import Shared, { SharedApi } from '@shared';

export default async function GameSelect() {
  const data = await SharedApi.serverQuery("get-all-support-games", null);

  return (
    <section className='w-full h-full flex flex-col'>
      <Shared.Container>
        Select Game
      </Shared.Container>

      <div className='p-6 flex-1'>
        <GameList data={data} />
      </div>
    </section>
  )
}
