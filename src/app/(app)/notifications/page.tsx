"use client"
import { Virtuoso } from "react-virtuoso";
import { Bars3Icon } from "@heroicons/react/24/outline";

import { useCurrentUserQuery } from "@/queries/user";
import { useSidebarStore } from "@/stores/sidebar-store";
import { NotificationCard } from "@/components/NotificationCard";
import { useNotificationQuery } from "@/queries/notification";


export default function Notification() {
    const {setIsOpen, notificationBadge, setNotificationBadge} = useSidebarStore((state) => state)
    
    const {data: me} = useCurrentUserQuery()
    const {data: notificationsPages, fetchNextPage, isSuccess} = useNotificationQuery(!!me?.id)

    const notifications = notificationsPages?.pages.flatMap(page => {
        return page
    })

    if(isSuccess && notificationBadge){
        setNotificationBadge(0)
    }
    
    return (
        <div className="min-h-full md:border-x-[1px]">
            <nav className="grid grid-cols-3 w-full h-14 border-b-[1px]">
                <Bars3Icon className="size-6 self-center ml-4 md:hidden" onClick={() => setIsOpen(true)}/>
                <div className="text-center self-center md:col-span-3 cursor-pointer">Notifications</div>
            </nav>
            <Virtuoso 
                useWindowScroll
                style={{height: '100%'}}
                data={notifications} 
                itemContent={(index, notification) =>{ return <NotificationCard key={index} notification={notification} username={me.username}/>}}
                endReached={(_) => fetchNextPage()}
                />
        </div>
    );
}
