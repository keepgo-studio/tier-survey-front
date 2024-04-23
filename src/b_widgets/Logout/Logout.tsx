"use client"

import React from 'react'
import Shared from '@shared';
import Entities from '@entities';

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
        <Shared.Button onClick={signout}>Logout</Shared.Button>
      </section>
    )
  }
}
