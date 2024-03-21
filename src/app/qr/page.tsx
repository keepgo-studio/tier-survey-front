import React from 'react'
import Shared from '@shared'
import Widget from '@widgets'

export default function page() {
  return (
    <div>
      <Shared.Container>
        Hello
        {'\n'}
        밥상의국거리
      </Shared.Container>

      <Widget.QRCodeGenerator />
    </div>
  )
}
