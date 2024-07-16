'use client'

import { AppStore } from '@entities'
import React, { useRef } from 'react'
import { makeStore } from './store';
import { Provider } from 'react-redux';
import userSlice, { UserState } from './slices/userSlice';


export default function StoreProvider({
  user,
  children
}: {
  user?: UserState;
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();

    if (user) {
      storeRef.current.dispatch(userSlice.actions.initState(user));
    }
  }

  return (
    <Provider store={storeRef.current}>
      {children}
    </Provider>
  )
}
