import React from 'react'
import { SupportGameJsonItem } from '@shared'
import { default as LeagueOfLegendsSidebar } from './LeagueOfLegends/Sidebar/Sidebar';

export type StatProps = {
  gameInfo: SupportGameJsonItem;
  hashedId: string;
}

export default function Stat(props: StatProps) {
  const sidebarRender = () => {
    switch(props.gameInfo['game-name']) {
      case "league of legends": return <LeagueOfLegendsSidebar {...props} />
    }
  }

  const statRender = () => {}

  return (
    <section className='p-6 grid grid-cols-[320px_1fr]'>
      {sidebarRender()}
    </section>
  )
}
