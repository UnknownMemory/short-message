import { RequestError } from "../error";

export const getCurrentUser = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user/me`, {method: 'GET', headers: {'Authorization': `Bearer ${document.cookie.match('(^|;)\\s*' + 'accessToken' + '\\s*=\\s*([^;]+)')?.pop()}`, 'Content-Type': 'application/json'}});
    
    if(res.status != 200){
        throw new RequestError('Authentication error', 401)
    }
    
    return await res.json();
};
