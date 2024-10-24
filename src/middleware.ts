import { NextRequest, NextResponse } from "next/server";
import { checkJWT } from "./utils/auth";
import { JWTPayload } from "jose";


export async function middleware(request: NextRequest) {
    if (protectedAPIRoutes.some((route: string) => request.nextUrl.pathname.match(route))) {
        const requestHeaders = new Headers(request.headers)
        let token: string | null = requestHeaders.get('Authorization')

        if (token == null) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        token = token.replace('Bearer ', "")

        const loggedUser: false | JWTPayload = await checkJWT(token)

        if (await loggedUser) {
            const response = NextResponse.next()
            response.headers.set('userID', loggedUser.id)
            return response
        }

        return NextResponse.json({ 'error': 'Authentication error' }, { status: 401 });

    }

    if (request.nextUrl.pathname.match(profileRoute)) {
        const requestHeaders = new Headers(request.headers)
        let token: string | null = requestHeaders.get('Authorization')

        if (token == null) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        token = token.replace('Bearer ', "")

        const loggedUser: false | JWTPayload = await checkJWT(token)

        if (await loggedUser) {
            const response = NextResponse.next()
            response.headers.set('userID', loggedUser.id)
            return response
        }

        return NextResponse.next();

    }

}

const protectedAPIRoutes = ['^/api/user/me$', '^/api/post/timeline$', '^/$', '^/api/post/like$', '^/api/post/user-timeline/[0-9]+$']
const profileRoute = '^\/api\/user(\/(?!notifications|settings|logout)[^\/]*)*$'

export const config = {
    matcher: ['/api/:path*']
}

