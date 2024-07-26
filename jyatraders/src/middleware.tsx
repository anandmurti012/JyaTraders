import { NextRequest, NextResponse } from 'next/server'

export const middleware = (request: NextRequest) => {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/' || path === '/apply' || path === '/services' || path === '/about';

    const token = "request.cookies.get('token')";
    const role = "admin"; // assuming the role is stored in cookies

    if (isPublicPath && token) {
        if (role === 'admin') {
            return NextResponse.redirect(new URL('/admin', request.nextUrl));
        } else if (role === 'user') {
            return NextResponse.redirect(new URL('/user', request.nextUrl));
        }
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    // Additional check to prevent users from accessing admin routes and vice versa
    if (!isPublicPath && token) {
        if (path.startsWith('/admin') && role !== 'admin') {
            return NextResponse.redirect(new URL('/user', request.nextUrl));
        } else if (path.startsWith('/user') && role !== 'user') {
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
        '/user/:path*'
    ]
}
