import { NextRequest, NextResponse } from 'next/server'

export const middleware = (request: NextRequest, response: NextResponse) => {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/' || path === '/apply' || path === '/services' || path === '/about'

    const token = request.cookies.get('token');
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/dashboard',
        '/apply',
        '/services',
        '/about'
    ]
}