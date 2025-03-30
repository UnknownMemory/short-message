import { NextRequest, NextResponse } from "next/server";

import { checkJWT } from "./utils/auth";
import { getCookie } from "./utils/utils";

import { UserJWTPayload } from "./types/User";


const getAccessToken = async (headers: Headers) => {
    let token: string | null = headers.get('Authorization')
    if (token) {
        token = token.replace('Bearer ', "")
        return token
    }

    let cookieToken: string | null | undefined = headers.get('Cookie')
    if (cookieToken) {
        cookieToken = getCookie('accessToken')
        return cookieToken
    }

    return null
}

export async function middleware(request: NextRequest) {

    if (request.nextUrl.pathname.startsWith('/api/')) {
        const token: string | null | undefined = await getAccessToken(new Headers(request.headers))
        if (!token || token == undefined) {
            return NextResponse.json({ 'error': 'Authentication error' }, { status: 401 });
        }

        const loggedUser: false | UserJWTPayload = await checkJWT(token)
        if (loggedUser) {
            const response = NextResponse.next()
            response.headers.set('userID', loggedUser.id)
            return response
        }
    }

    if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/signup')) {
        const token: string | null | undefined = await getAccessToken(new Headers(request.headers))

        if (token && token != null) {
            const loggedUser: false | UserJWTPayload = await checkJWT(token)

            if (loggedUser) {
                return NextResponse.redirect(new URL('/', request.url))
            }
        }
        return NextResponse.next()
    }

}

export const config = {
    matcher: ['/api/:path*', '/login', '/signup']
}

