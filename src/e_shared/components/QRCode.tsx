'use client'

import React from 'react'
import { QRCodeCanvas } from 'qrcode.react'

type QRProps = {
  url: string;
  size?: number;
}

export default function QRCode({ url, size = 128 }: QRProps) {
  return (
    <QRCodeCanvas value={url} size={size} />
  )
}
