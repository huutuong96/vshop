import envConfig from '@/config';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const authPaths = ['/auth/login', '/auth/register', '/auth/verify'];
const privatePaths = ['/admin', '/admin/products/all', '/admin/products/create', '/admin/categories/createm', '/account', '/checkout']

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const info = request.cookies.get('info')?.value;
  const stateCheckout = request.cookies.get('stateCheckout')?.value;



  if (privatePaths.some(path => pathname.startsWith(path)) && !accessToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }


  if (authPaths.some(path => pathname.startsWith(path)) && accessToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (pathname.startsWith('/shop') && !accessToken) {
    return NextResponse.redirect(new URL('/auth/register', request.url))
  }
  if (pathname.startsWith('/welcome') && !accessToken) {
    return NextResponse.redirect(new URL('/auth/register', request.url))
  }

  if (info) {
    const infoParse = JSON.parse(info ? info : '');
    const test = { ...infoParse, shop_id: null };

    if (pathname.startsWith('/welcome') && accessToken && infoParse.shop_id) {
      return NextResponse.redirect(new URL('/shop', request.url))
    }

    if (pathname.startsWith('/shop') && accessToken) {
      if (!infoParse.shop_id) {
        return NextResponse.redirect(new URL('/welcome', request.url))
      }
    }
  }




}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    '/shop/:path*'
  ],
}