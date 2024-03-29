import React from 'react'
import Shared from '@shared'
import Widget from '@widgets'

export default function page() {
  return (
    <div>
      <Shared.Container>
        Request Permissions for ...
      </Shared.Container>

      <Widget.PermissionPanel />
    </div>
  )
}