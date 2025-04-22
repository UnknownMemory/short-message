'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { RequestError } from '@/utils/error'
import { getCookie } from '@/utils/utils'

export default function Providers({ children }: {children: React.ReactNode}) {
    const router =  useRouter()

    const setHeaders = () => {
        let headers = new Headers()
        let accessToken = getCookie('accessToken')
    
        headers.append('Content-Type', 'application/json')
        if(accessToken != undefined){
            headers.append('Authorization', `Bearer ${getCookie('accessToken')}`)
        }
    
        return headers
    }

    const refreshTokenService = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/refreshtoken`, {method: 'GET', headers: setHeaders()});
        
        if(res.status === 400){
            router.push('/login')
        }

        return await res.json()
    }

    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 30000,
                retry: (failureCount, error: RequestError) => {
                    if (error.status === 401 || error.status === 404){
                        return false;
                    }
                    return failureCount <= 1;
                },
            },
        },
        queryCache: new QueryCache({
            onError: async (error: RequestError) => {
                if(error.status === 401){
                    refreshTokenService()
                }
            }
        })
    }))
  
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
