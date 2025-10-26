import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query"

import { tFetch } from "."


export function useCurrentUserQuery() {
    const qClient = useQueryClient()

    return useQuery({
        queryKey: ['me'],
        queryFn: async () => await tFetch('/api/user/me', 'GET'),
        initialData: () => {
            return qClient.getQueryData(['me'])
        },
        staleTime: Infinity,
    })
}

export function useUserProfileQuery(username: string | string[]) {
    return useQuery({
        queryKey: ['profile', username],
        queryFn: async () => await tFetch(`/api/user/${username}`, 'GET'),
        staleTime: 1000 * 20,
    })
}


export const useUserLikesQuery = (userId: number, tab: "posts" | "likes") => {
    const isTabLikes = tab == "likes"
    return useInfiniteQuery({
        queryKey: ['likes'],
        queryFn: async ({ pageParam }) => {
            const cursor = pageParam ? '?cursor=' + pageParam : ''
            return await tFetch(`/api/user/me/like` + cursor, 'GET')
        },
        initialPageParam: false,
        getNextPageParam: (lastPage, pages) => lastPage.pageParam,
        getPreviousPageParam: (firstPage, pages) => firstPage.pageParam,
        enabled: !!userId && isTabLikes,
        staleTime: Infinity
    })
}
