import React from 'react'
import Widget from '@widgets'
import { SharedApi } from '@shared';

export default async function page() {
  const data = await SharedApi.serverQuery("get-all-support-games", null);

  return (
    <section className='max-w-5xl m-auto h-full fcenter flex-col py-6 px-4'>
      <h1 className='uppercase text-bright-gray text-4xl font-light w-full'>
        select game
      </h1>

      <div className='h-6' />

      <Widget.GameSelect data={data} />
    </section>
  );
}
