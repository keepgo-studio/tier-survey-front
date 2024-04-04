import React from 'react'
import Widget from '@widgets'

export default function page() {
  // [ ] hashedId 불러올 때 없으면 login페이지로 (login 후 back)
  // [x] apiType을 parameter로 받아오기
  return (
    <>
      <Widget.Progress />
    </>
  )
}
