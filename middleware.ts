// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value || ""; 
  // Lưu ý: Nếu lưu localStorage thì Middleware không đọc được phía server.
  // Ở đây mình tạm check theo logic client-side redirect trong page.tsx cho bạn dễ dùng.
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/profile/:path*'],
}