import { getCookie } from "@/utils/utils"

const HOST = process.env.NEXT_PUBLIC_HOST

const setHeaders = () => {
    let headers = new Headers()
    let accessToken = getCookie('accessToken')

    headers.append('Content-Type', 'application/json')
    if (accessToken != undefined) {
        headers.append('Authorization', `Bearer ${getCookie('accessToken')}`)
    }

    return headers
}

export const tFetch = async (url: string, method: string): Promise<any> => {
    try {
        let res = await fetch(HOST + url, { method: method });
        if (res.status === 401) {
            const newToken = await refreshToken()
            if (newToken) {
                return await tFetch(url, method)
            }
        }
        return await res.json();
    } catch (error) {
        console.error(error)
    }
}

export const refreshToken = async () => {
    const res = await fetch(`${HOST}/api/auth/refreshtoken`, { method: 'GET', headers: setHeaders() });

    if (res.status === 400) {
        window.location.replace(`${HOST}/login`)
    }

    return true
}
