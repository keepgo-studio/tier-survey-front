"use client"

import React from 'react'
import { StatProps } from '../../Stat'
import Shared from '@shared'

export default function ChartContainer({
  gameInfo,
  hashedId
}: StatProps) {

  return (
    <Shared.Frame className='!p-4 bg-linear-black'>
      <Shared.Spinner />
    </Shared.Frame>
  )
}
