import { NextResponse } from "next/server";


export async function GET(request: Request) {
    const loginURL = new URL("/login", new URL(request.url).origin);

    const response = NextResponse.redirect(loginURL, { status: 303 });

    response.cookies.set('refreshToken', 'del', { httpOnly: true, sameSite: 'strict', domain: process.env.DOMAIN, path: '/api/auth/refreshtoken', maxAge: 0 })
    response.cookies.delete('accessToken')
    return response
}
