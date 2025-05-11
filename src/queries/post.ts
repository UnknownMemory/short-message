import { useQuery, useQueryClient } from "@tanstack/react-query"

import { RequestError } from "@/utils/error";
import { setHeaders } from ".";


export const usePostQuery = (postId: number) => {
    const qClient = useQueryClient()

    return useQuery({
        queryKey: ['post', postId],
        queryFn: async () => {
            try {
                const res = await fetch(`${URL}/api/post/${postId}`, { method: 'GET', headers: setHeaders() })
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
            return qClient.getQueryData(['post', postId])
        },
        staleTime: Infinity,
    })
}
