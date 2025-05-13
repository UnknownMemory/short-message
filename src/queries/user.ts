import { useQuery, useQueryClient } from "@tanstack/react-query"

import { HOST, setHeaders } from "."
import { RequestError } from "@/utils/error";


export function useCurrentUserQuery() {
    const qClient = useQueryClient()

    return useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            try {
                const res = await fetch(`${HOST}/api/user/me`, { method: 'GET', headers: setHeaders() });
                if (res.status != 200) {
                    const response = await res.json()
                    throw new RequestError(response.error, res.status)
                }
                return await res.json();
            } catch (error) {
                console.error(error)
            }
        },
        initialData: () => {
            return qClient.getQueryData(['me'])
        },
        staleTime: Infinity,
    })
}


export function useUserProfileQuery(username: string | string[]) {
    return useQuery({
        queryKey: ['profile', username],
        queryFn: async () => {
            try {
                const res = await fetch(`${HOST}/api/user/${username}`, { method: 'GET', headers: setHeaders() });
                if (res.status != 200) {
                    const response = await res.json()
                    throw new RequestError(response.error, res.status)
                }
                return await res.json();
            } catch (error) {
                console.error(error)
            }

        },
        staleTime: 1000 * 20,
    })
}
