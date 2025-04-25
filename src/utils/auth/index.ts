import { UserJWTPayload } from "@/types/User"
import * as jose from "jose"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { cookies } from "next/headers"

export const generateTokens = async (userID: unknown, expires: { 'expireAccess': string, 'expireRefresh': string }) => {
    const accessSecret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)
    const refreshSecret = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET)
    const alg = 'HS256'

    const accessToken: string = await new jose.SignJWT({ 'id': userID })
        .setProtectedHeader({ alg })
        .setExpirationTime(expires.expireAccess)
        .sign(accessSecret)

    const refreshToken: string = await new jose.SignJWT({ 'id': userID })
        .setProtectedHeader({ alg })
        .setExpirationTime(expires.expireRefresh)
        .sign(refreshSecret)

    return [accessToken, refreshToken]
}


export const checkJWT = async (token: string) => {
    let user
    const accessSecret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)

    try {
        user = await jose.jwtVerify<UserJWTPayload>(token, accessSecret)
    } catch (e) {
        return false
    }

    return user.payload
}


export const authAction = async (accessToken: RequestCookie | undefined, action: Function, ...args: any[]) => {
    if (accessToken) {
        const isLogged = await checkJWT(accessToken.value)
        if (isLogged) {
            return await action(isLogged, ...args)
        }
    }
    return { 'errors': 'You must be authenticated to perform this action.' }
}


export const apiCheckAuth = async () => {
    // let token: string | null = headers.get('Authorization')
    let token: string | undefined = cookies().get('accessToken')?.value
    if (token) {
        return await checkJWT(token)
    }

    return false
}
