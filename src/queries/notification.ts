import { useInfiniteQuery } from "@tanstack/react-query"

import { HOST, setHeaders } from "."
import { RequestError } from "@/utils/error"


export const useNotificationQuery = (enabled: boolean) => {
    return useInfiniteQuery({
        queryKey: ['notifications'],
        queryFn: async ({ pageParam }) => {
            try {
                const res = await fetch(`${HOST}/api/notification`, { method: 'GET', headers: setHeaders() })
                if (res.status != 200) {
                    const response = await res.json()
                    throw new RequestError(response.error, res.status)
                }
                return await res.json();
            } catch (error) {
                console.error(error)
            }
        },
        initialPageParam: false,
        getNextPageParam: (lastPage, pages) => lastPage.pageParam,
        getPreviousPageParam: (firstPage, pages) => firstPage.pageParam,
        enabled: enabled,
        staleTime: 1000 * 60
    })
}
