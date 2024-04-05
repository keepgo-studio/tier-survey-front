import React from 'react'
import LeagueOfLegends from './LeagueOfLegendsStat/LeagueOfLegendsStat'

export default function Stat({
  currentGame
}: {
  currentGame: SupportGame
}) {
  if (currentGame === "league of legends")
    return <LeagueOfLegends />
}
