import React from 'react'
import GameList from './GameList';
import { SharedApi } from '@shared';

export default async function GameSelect() {
  const data = await SharedApi.serverQuery("get-all-support-games", null);

  return (
    <div>
      <GameList data={data} />
    </div>
  )
}
