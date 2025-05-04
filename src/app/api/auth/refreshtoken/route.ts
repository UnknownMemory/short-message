import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import type { JWTVerifyResult } from "jose";
import * as jose from "jose"

import { generateTokens } from "@/utils/auth"
import { getFutureDate } from '@/utils/utils';


export async function GET(request: Request) {
    let jwt: JWTVerifyResult

    const cookieStore = cookies()
    const refreshToken = cookieStore.get('refreshToken')

    if (refreshToken == undefined) {
        return NextResponse.json({ 'error': { 'type': 'TokenError' } }, { status: 400 })
    }

    const refreshSecret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET)

    try {
        jwt = await jose.jwtVerify(refreshToken.value, refreshSecret)
    } catch (e) {
        return NextResponse.json({ 'error': { 'type': 'TokenError' } }, { status: 400 })
    }

    const [accessToken, newRefreshToken] = await generateTokens(jwt.payload.id, jwt.payload.username, { 'expireAccess': '8h', 'expireRefresh': '30d' })

    const expireDate: number = getFutureDate(30)

    const response = NextResponse.json(
        { 'status': 'ok' },
        { status: 200 }
    );

    response.cookies.set('accessToken', accessToken, { sameSite: 'strict', domain: process.env.DOMAIN, expires: getFutureDate(8) })
    response.cookies.set('refreshToken', newRefreshToken, { httpOnly: true, sameSite: 'strict', domain: process.env.DOMAIN, path: '/api/auth/refreshtoken', expires: expireDate })
    return response
}
