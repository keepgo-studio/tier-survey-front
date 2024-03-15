import React from 'react'
import GameList from './GameList';
import { SharedHooks } from '@/e_shared';

export default async function GameSelect() {
  const data = await SharedHooks.useQuery("get-all-support-games", null);

  return (
    <div>
      <GameList data={data} />
    </div>
  )
}
