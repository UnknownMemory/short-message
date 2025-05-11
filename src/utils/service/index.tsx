import { RequestError } from "../error";
import { getCookie } from "../utils";

const URL = process.env.NEXT_PUBLIC_HOST

const setHeaders = () => {
    let headers = new Headers()
    let accessToken = getCookie('accessToken')

    headers.append('Content-Type', 'application/json')
    if(accessToken != undefined){
        headers.append('Authorization', `Bearer ${getCookie('accessToken')}`)
    }

    return headers
}

export const getUser = async (username: string | string[]) => {
    let reqHeaders = setHeaders()
    const res = await fetch(`${URL}/api/user/${username}`, {method: 'GET', headers: reqHeaders});
    
    if(res.status != 200){
        const response = await res.json()
        throw new RequestError(response.error, res.status)
    }
    
    return await res.json();
};

export const getTimeline = async (cursor?: string | boolean) => {
    let reqHeaders = setHeaders()
    const res = await fetch(`${URL}/api/post/timeline${cursor ? '?cursor='+cursor : ''}`, {method: 'GET', headers: reqHeaders})

    if(res.status != 200){
        const response = await res.json()
        throw new RequestError(response.error, res.status)
    }
    
    return await res.json();
}

export const userTimeline = async (userId: number, cursor?: string | boolean) => {
    let reqHeaders = setHeaders()
    const res = await fetch(`${URL}/api/post/user-timeline/${userId}/${cursor ? '?cursor='+cursor : ''}`, {method: 'GET', headers: reqHeaders})

    if(res.status != 200){
        const response = await res.json()
        throw new RequestError(response.error, res.status)
    }
    
    return await res.json();
}

export const getNotifications = async () => {
    let reqHeaders = setHeaders()
    const res = await fetch(`${URL}/api/notification`, {method: 'GET', headers: reqHeaders})

    if(res.status != 200){
        const response = await res.json()
        throw new RequestError(response.error, res.status)
    }
    
    return await res.json();
}
