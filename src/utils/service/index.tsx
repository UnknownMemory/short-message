import { RequestError } from "../error";

export const getCurrentUser = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user/me`, {method: 'GET', headers: {'Authorization': `Bearer ${document.cookie.match('(^|;)\\s*' + 'accessToken' + '\\s*=\\s*([^;]+)')?.pop()}`, 'Content-Type': 'application/json'}});
    
    if(res.status != 200){
        const response = await res.json()
        throw new RequestError(response.error, res.status)
    }
    
    return await res.json();
};

export const getUser = async (username: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user/${username}`, {method: 'GET', headers: {'Content-Type': 'application/json'}});
    
    if(res.status != 200){
        const response = await res.json()
        throw new RequestError(response.error, res.status)
    }
    
    return await res.json();
};
