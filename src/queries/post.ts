import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query"
import { tFetch } from ".";


export const usePostQuery = (postId: number) => {
    const qClient = useQueryClient()

    return useQuery({
        queryKey: ['post', postId],
        queryFn: async () => await tFetch(`/api/post/${postId}`, 'GET'),
        initialData: () => {
            return qClient.getQueryData(['post', postId])
        },
        staleTime: 1000 * 10,
    })
}

export const useTimelineQuery = (enabled: boolean) => {
    return useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: async ({ pageParam }) => {
            const cursor = pageParam ? '?cursor=' + pageParam : ''
            return await tFetch('/api/post/timeline' + cursor, 'GET')
        },
        initialPageParam: false,
        getNextPageParam: (lastPage, pages) => lastPage.pageParam,
        getPreviousPageParam: (firstPage, pages) => firstPage.pageParam,
        enabled: enabled,
        staleTime: Infinity
    })
}

export const useUserTimelineQuery = (username: string | string[], userId: number, tab: "posts" | "likes") => {
    const isTabPosts = tab == "posts"
    return useInfiniteQuery({
        queryKey: ['posts', username],
        queryFn: async ({ pageParam }) => {
            const cursor = pageParam ? '?cursor=' + pageParam : ''
            return await tFetch(`/api/post/user-timeline/${userId}` + cursor, 'GET')
        },
        initialPageParam: false,
        getNextPageParam: (lastPage, pages) => lastPage.pageParam,
        getPreviousPageParam: (firstPage, pages) => firstPage.pageParam,
        enabled: !!userId && isTabPosts,
        staleTime: Infinity
    })
}
