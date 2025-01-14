import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if token is in cookies
  const authToken = request.cookies.get('access_token');

  // If not exists, try to enter on protected page
  if (!authToken && request.nextUrl.pathname.startsWith('/dashboard')) {
    // Redirect on login page, keeping original URL as returnUrl
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('returnUrl', request.nextUrl.pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
