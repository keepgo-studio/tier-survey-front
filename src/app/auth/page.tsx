import React from 'react'
import Widget from '@widgets'
import { cookies } from 'next/headers'
import { SharedNodeUtils } from '@shared';

export default function page() {
  const cookieStore = cookies();
  const hashedId = SharedNodeUtils.decrypt(cookieStore.get("hashed-id")?.value ?? "");

  return (
    <Widget.AuthProvider cookieHahsedId={hashedId}/>
  )
}
