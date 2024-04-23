"use client"

import React from 'react'
import Shared from '@shared';
import Entities from '@entities';

export default function Logout() {
  const hashedId = Entities.hooks.useAppSelector(Entities.user.selectHashedId);

  if (hashedId) {
    return (
      <section>
        <Shared.Button>Logout</Shared.Button>
      </section>
    )
  }
}
