'use client'

import React from 'react'
import { QRCodeCanvas } from 'qrcode.react'

export default function QRCode({ url }: { url: string }) {
  return (
    <QRCodeCanvas value={url} />
  )
}
