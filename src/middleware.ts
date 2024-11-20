import { NextRequest, NextResponse } from "next/server";
import { checkJWT } from "./utils/auth";

import { UserJWTPayload } from "./types/User";

const getAccessToken = async (headers: Headers) => {
    let token: string | null = headers.get('Authorization')
    if (token) {
        token = token.replace('Bearer ', "")
        return token
    }

    let cookieToken: string | null | undefined = headers.get('Cookie')
    if (cookieToken) {
        cookieToken = cookieToken.match('(^|;)\\s*' + 'accessToken' + '\\s*=\\s*([^;]+)')?.pop()
        return cookieToken
    }

    return false
}

export async function middleware(request: NextRequest) {
    if (protectedAPIRoutes.some((route: string) => request.nextUrl.pathname.match(route))) {
        const token: string | false | undefined = await getAccessToken(new Headers(request.headers))

        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        const loggedUser: false | UserJWTPayload = await checkJWT(token)

        if (loggedUser) {
            const response = NextResponse.next()
            response.headers.set('userID', loggedUser.id)
            return response
        }

        return NextResponse.json({ 'error': 'Authentication error' }, { status: 401 });

    }

    if (request.nextUrl.pathname.match(profileRoute)) {
        const token: string | false | undefined = await getAccessToken(new Headers(request.headers))

        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        const loggedUser: false | UserJWTPayload = await checkJWT(token)

        if (loggedUser) {
            const response = NextResponse.next()
            response.headers.set('userID', loggedUser.id)
            return response
        }

        return NextResponse.next();

    }

}

const protectedAPIRoutes = ['^/api/user/me$', '^/api/post/timeline$', '^/$', '^/api/post/like$', '^/api/post/user-timeline/[0-9]+$', '^/api/post/timeline/update$']
const profileRoute = '^\/api\/user(\/(?!notifications|settings|logout)[^\/]*)*$'

export const config = {
    matcher: ['/api/:path*']
}

