import { NextRequest, NextResponse } from 'next/server'

export const middleware = (request: NextRequest) => {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/' || path === '/apply' || path === '/services' || path === '/about';

    const token = request.cookies.get('jts_token')?.value;
    const role = request.cookies.get('jts_role')?.value;

    if (isPublicPath && token) {
        if (role === 'admin') {
            return NextResponse.redirect(new URL('/admin', request.nextUrl));
        } else if (role === 'user') {
            return NextResponse.redirect(new URL('/users', request.nextUrl));
        } else {
            return NextResponse.redirect(new URL('/', request.nextUrl));
        }
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    // Additional check to prevent users from accessing admin routes and vice versa
    if (!isPublicPath && token) {
        if (path.startsWith('/admin') && role !== 'admin') {
            return NextResponse.redirect(new URL('/users', request.nextUrl));
        } else if (path.startsWith('/users') && role !== 'user') {
            return NextResponse.redirect(new URL('/admin', request.nextUrl));
        }
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/apply',
        '/services',
        '/about',
        '/admin/:path*',
        '/users/:path*'
    ]
}
