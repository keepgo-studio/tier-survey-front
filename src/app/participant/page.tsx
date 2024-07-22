import React from 'react'
import Widget from '@widgets'
import { SharedApi } from '@shared';

export default async function page() {
  const data = await SharedApi.serverQuery("get-all-support-games", null);

  return (
    <div className='max-w-5xl m-auto w-full h-full p-6 flex flex-col justify-center gap-8'>
      <Widget.Title>joined survey</Widget.Title>

      <Widget.SurveyHistory gameList={data} />
    </div>
  )
}
