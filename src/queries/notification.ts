import { useInfiniteQuery } from "@tanstack/react-query"

import { tFetch } from "."

export const useNotificationQuery = (enabled: boolean) => {
    return useInfiniteQuery({
        queryKey: ['notifications'],
        queryFn: async ({ pageParam }) => {
            return await tFetch('/api/notification', 'GET')
        },
        initialPageParam: false,
        getNextPageParam: (lastPage, pages) => lastPage.pageParam,
        getPreviousPageParam: (firstPage, pages) => firstPage.pageParam,
        enabled: enabled,
        staleTime: 1000 * 60
    })
}
