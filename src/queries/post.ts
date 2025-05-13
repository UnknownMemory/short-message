import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query"

import { RequestError } from "@/utils/error";
import { setHeaders, HOST } from ".";


export const usePostQuery = (postId: number) => {
    const qClient = useQueryClient()

    return useQuery({
        queryKey: ['post', postId],
        queryFn: async () => {
            try {
                const res = await fetch(`${HOST}/api/post/${postId}`, { method: 'GET', headers: setHeaders() })
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

export const useTimelineQuery = (enabled: boolean) => {
    return useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: async ({ pageParam }) => {
            const cursor = pageParam ? '?cursor=' + pageParam : ''
            try {
                const res = await fetch(`${HOST}/api/post/timeline${cursor}`, { method: 'GET', headers: setHeaders() })
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
        staleTime: Infinity
    })
}

export const useUserTimelineQuery = (username: string | string[], userId: number) => {
    return useInfiniteQuery({
        queryKey: ['profile_posts', username],
        queryFn: async ({ pageParam }) => {
            const cursor = pageParam ? '?cursor=' + pageParam : ''
            console.log(cursor)
            try {
                const res = await fetch(`${HOST}/api/post/user-timeline/${userId}/${cursor}`, { method: 'GET', headers: setHeaders() })
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
        enabled: !!userId,
        staleTime: Infinity
    })
}
