'use client'

import { AppStore, RootState } from '@entities'
import React, { useRef } from 'react'
import { makeStore } from './store';
import { Provider } from 'react-redux';
import userSlice from './user/userSlice';

export default function StoreProvider({
  data,
  children
}: {
  data?: RootState;
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    storeRef.current = makeStore();

    if (data) {
      // user init
      storeRef.current.dispatch(userSlice.actions.initState(data.user));
    }
  }

  return (
    <Provider store={storeRef.current}>
      {children}
    </Provider>
  )
}
