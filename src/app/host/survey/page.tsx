import { SharedApi } from '@shared';
import Widget from '@widgets';
import Link from 'next/link';
import React from 'react'

export default async function page() {
  const data = await SharedApi.serverQuery("get-all-support-games", null);

  return (
    <div className='max-w-5xl m-auto w-full h-full p-6 flex flex-col justify-center gap-8'>
      <Widget.Title>created survey</Widget.Title>

      <Widget.SurveyList gameList={data} />
    </div>
  )
}
