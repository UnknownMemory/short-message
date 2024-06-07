import { NextRequest, NextResponse } from "next/server";
import { checkJWT } from "./utils/auth";
import { cookies } from "next/headers";


export async function middleware(request: NextRequest) {
    if (protectedRoutes.some((route: string) => request.nextUrl.pathname.match(route))) {
        const cookieStore = cookies()
        const token = cookieStore.get('accessToken')

        if (token == undefined) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        if (await checkJWT(token.value)) {
            return NextResponse.next()
        }

        return NextResponse.redirect(new URL('/login', request.url))

    }

    if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/signup')) {
        const cookieStore = cookies()
        const token = cookieStore.get('accessToken')

        if (token != undefined) {
            if (await checkJWT(token.value)) {
                return NextResponse.redirect(new URL('/', request.url))
            }
            return NextResponse.next()
        }



        return NextResponse.next()

    }
}

const protectedRoutes = ['^/api/auth/refreshtoken$', '^/api/user/me$', '^/$']

export const config = {
    matcher: ['/api/:path*', '/', '/login', '/signup']
}

