import * as jose from "jose"
import { NextRequest, NextResponse } from "next/server";


export async function middleware(request: NextRequest) {
    if (protectedRoutes.some((route: string) => request.nextUrl.pathname.match(route))) {
        const accessSecret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)

        const requestHeaders = new Headers(request.headers)
        let token: string | null = requestHeaders.get('Authorization')

        if (token == null) {
            return NextResponse.redirect(new URL('/', request.url))
        }
        token = token.replace('Bearer ', "")

        try {
            await jose.jwtVerify(token, accessSecret)
        } catch (e) {
            throw new Error("User not authenticated")
        }

        return NextResponse.next()
    }
}

const protectedRoutes = ['^/api/auth/refreshtoken$']

export const config = {
    matcher: ['/api/:path*']
}

