import React from 'react'
import Shared from '@shared'
import Widget from '@widgets'

export default function page() {
  return (
    <>
      <Shared.Container>
        Hello
      </Shared.Container>
      <Widget.QRCodeGenerator />
    </>
  )
}