"use client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { RequestError } from "@/utils/error";

function makeQC() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 30000,
                retry: (failureCount, error: RequestError) => {
                    if (error.status === 401 || error.status === 404) {
                        return false;
                    }
                    return failureCount <= 1;
                },
            },
        },
    });
}

export default function Providers({ children }: { children: React.ReactNode }) {
    const queryClient = makeQC();
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}
