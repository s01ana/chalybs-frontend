import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL('/swap', req.url))
  }
  
  return res
}

export const config = {
  matcher: [
    '/',
    '/swap',
    '/liquidity',
    '/farms',
    '/pools',
    '/add',
    '/remove',
    '/find',
    '/info/:path*',
  ],
}
