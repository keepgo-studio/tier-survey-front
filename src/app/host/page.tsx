import React from 'react'
import Widget from '@widgets'
import { SharedApi } from '@shared';

export default async function page() {
  const data = await SharedApi.serverQuery("get-all-support-games", null);

  return (
    <section className='max-w-5xl m-auto w-full h-full p-6 flex flex-col justify-center'>
      <Widget.Title>select game</Widget.Title>
      
      <Widget.GameSelect data={data} />
    </section>
  );
}
