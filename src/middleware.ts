import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // return NextResponse.redirect(new URL('/home', request.url));
}

export const config = {
  matches: "/((?!api|_next/static|_next/image|.*\\.png$).*)"
}

// [ ] Session을 유지해서 다시 사이트 접속하면 
// 1. 아무것도 없어서 qr코드 생성
// 2. 설문 진행중이라 qr화면
// 3. 이미 시행한 이후고 설문도 없으면 통계 사잉트로 redirect