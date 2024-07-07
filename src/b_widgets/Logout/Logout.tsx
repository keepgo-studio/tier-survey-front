"use client"

import React from 'react'
import Entities from '@entities';
import { PiSignOutFill } from "react-icons/pi";

export default function Logout() {
  const hashedId = Entities.hooks.useAppSelector(Entities.user.selectHashedId);
  const dispatch = Entities.hooks.useAppDispatch();

  async function signout() {
    await fetch("/api/oauth/rso/logout");

    dispatch(Entities.user.setHashedId(null));
  }

  if (hashedId) {
    return (
      <section>
        <button className='button-prime' onClick={signout}>
          Logout
          <PiSignOutFill className='ml-[5px] text-lg' />
        </button>
      </section>
    )
  }
}
