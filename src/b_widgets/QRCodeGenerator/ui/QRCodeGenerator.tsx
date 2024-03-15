import React from 'react'
import Shared from '@/e_shared'

/**
 * 
 * QR 코드를 스캔하면 비밀번호를 요구
 */


// TODO client가 들어갈 url에 필요한 정보
// [ ] streamer hashId

// TODO streamer가 qr을 생성하기 위해 보내줘야할 것 (POST)
// [ ] streamer hashed JSON.stringify UserInfo from Riot Auth
// [ ] password 
// [ ] limit time = 5 ~ 30

export default function QRCodeGenerator() {
  return (
    <div>
      <Shared.Container>
        <Shared.QRCode url={"www.naver.com"} />
      </Shared.Container>
    </div>
  )
}
