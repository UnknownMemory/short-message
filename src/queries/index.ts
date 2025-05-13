import { getCookie } from "@/utils/utils"

export const HOST = process.env.NEXT_PUBLIC_HOST

export const setHeaders = () => {
    let headers = new Headers()
    let accessToken = getCookie('accessToken')

    headers.append('Content-Type', 'application/json')
    if (accessToken != undefined) {
        headers.append('Authorization', `Bearer ${getCookie('accessToken')}`)
    }

    return headers
}
