import { useQuery, useQueryClient } from "@tanstack/react-query"

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
