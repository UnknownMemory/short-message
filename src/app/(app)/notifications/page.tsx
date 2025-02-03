"use client"
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";

import { getCurrentUser, getNotifications } from "@/utils/service";
import { useSidebarStore } from "@/stores/sidebar-store";
import { Virtuoso } from "react-virtuoso";

export default function Notification() {
    const {setIsOpen} = useSidebarStore((state) => state)
    const qClient = useQueryClient()
    
    const {data: me} = useQuery({
        queryKey: ['me'],
        queryFn: () => getCurrentUser(),
        initialData: () => {
            return qClient.getQueryData(['me'])
        },
        staleTime: Infinity,
    })

    const {data: notificationsPages, fetchNextPage, refetch} = useInfiniteQuery({
        queryKey: ['notifications'],
        queryFn: ({pageParam}) => getNotifications(),
        initialPageParam: false,
        getNextPageParam: (lastPage, pages) => lastPage.cursor,
        getPreviousPageParam: (firstPage, pages) => firstPage.cursor,
        enabled: !!me?.id,
        staleTime: Infinity
    })

    const notifications = notificationsPages?.pages.flatMap(page => {
        return page
    })
    
    return (
        <div className="min-h-full border-x-[1px]">
            <nav className="grid grid-cols-3 w-full h-14 border-x-[1px] border-b-[1px]">
                <Bars3Icon className="size-6 self-center ml-4 md:hidden" onClick={() => setIsOpen(true)}/>
                <div className="text-center self-center md:col-span-3 cursor-pointer">Notifications</div>
            </nav>
            <Virtuoso 
                useWindowScroll
                style={{height: '100%'}}
                data={notifications} 
                itemContent={(index, notification) =>{ return <div key={index}>{notification.type}</div>}}
                endReached={(_) => fetchNextPage()}
                />
        </div>
    );
}
