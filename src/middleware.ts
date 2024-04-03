import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // return NextResponse.redirect(new URL('/home', request.url));
}

export const config = {
  matches: "/((?!api|_next/static|_next/image|.*\\.png$).*)"
}