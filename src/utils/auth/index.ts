import * as jose from "jose"


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
