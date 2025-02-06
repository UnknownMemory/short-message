import { RequestError } from "../error";
import { getCookie } from "../utils";

const URL = process.env.NEXT_PUBLIC_HOST

export const getCurrentUser = async () => {
    const res = await fetch(`${URL}/api/user/me`, {method: 'GET', headers: {'Authorization': `Bearer ${getCookie('accessToken')}`, 'Content-Type': 'application/json'}});
    
    if(res.status != 200){
        const response = await res.json()
        throw new RequestError(response.error, res.status)
    }
    
    return await res.json();
};

export const getUser = async (username: string | string[]) => {
    const res = await fetch(`${URL}/api/user/${username}`, {method: 'GET', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${getCookie('accessToken')}`}});
    
    if(res.status != 200){
        const response = await res.json()
        throw new RequestError(response.error, res.status)
    }
    
    return await res.json();
};

export const getPost = async (postId: number) => {
    const res = await fetch(`${URL}/api/post/${postId}`, {method: 'GET', headers: {'Authorization': `Bearer ${getCookie('accessToken')}`, 'Content-Type': 'application/json'}})

    if(res.status != 200){
        const response = await res.json()
        throw new RequestError(response.error, res.status)
    }
    
    return await res.json();
}


export const getTimeline = async (cursor?: string | boolean) => {
    const res = await fetch(`${URL}/api/post/timeline${cursor ? '?cursor='+cursor : ''}`, {method: 'GET', headers: {'Authorization': `Bearer ${getCookie('accessToken')}`, 'Content-Type': 'application/json'}})

    if(res.status != 200){
        const response = await res.json()
        throw new RequestError(response.error, res.status)
    }
    
    return await res.json();
}

export const userTimeline = async (userId: number, cursor?: string | boolean) => {
    const res = await fetch(`${URL}/api/post/user-timeline/${userId}/${cursor ? '?cursor='+cursor : ''}`, {method: 'GET', headers: {'Authorization': `Bearer ${getCookie('accessToken')}`, 'Content-Type': 'application/json'}})

    if(res.status != 200){
        const response = await res.json()
        throw new RequestError(response.error, res.status)
    }
    
    return await res.json();
}

export const getNotifications = async () => {
    const res = await fetch(`${URL}/api/notification`, {method: 'GET', headers: {'Authorization': `Bearer ${getCookie('accessToken')}`, 'Content-Type': 'application/json'}})

    if(res.status != 200){
        const response = await res.json()
        throw new RequestError(response.error, res.status)
    }
    
    return await res.json();
}
