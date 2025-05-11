import { useQuery, useQueryClient } from "@tanstack/react-query"

import { URL, setHeaders } from "."
import { RequestError } from "@/utils/error";


export function useCurrentInfoQuery() {
    const qClient = useQueryClient()

    return useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            try {
                const res = await fetch(`${URL}/api/user/me`, { method: 'GET', headers: setHeaders() });
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
