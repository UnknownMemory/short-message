'use client'
import Link from "next/link"

import { useQuery } from "@tanstack/react-query"
import { UserCircleIcon, HomeIcon, BellIcon } from "@heroicons/react/16/solid"

import { getCurrentUser } from "@/utils/service"
import { useSidebarStore } from "@/stores/sidebar-store"


export const BottomNavbar = () => {
    const {notificationBadge, setNotificationBadge} = useSidebarStore((state) => state)
    
    const {data: user} = useQuery({
        queryKey: ['me'],
        queryFn: () => getCurrentUser(),
        staleTime: Infinity,
    })

    return (
        <div className="max-sm:flex hidden w-full border-t-[1px] sticky bottom-0 bg-sm-white dark:bg-black items-center justify-between px-[25%]">
            <Link prefetch={false} className="p-3 text-sm-primary-dark dark:text-sm-white" href='/'><HomeIcon className="size-7"/></Link>
            <Link prefetch={false} className="p-3 text-sm-primary-dark dark:text-sm-white relative" href='/notifications'>
                {notificationBadge ? <div className="w-3 h-3 rounded-full bg-sm-primary absolute text-[0.50rem] flex justify-center items-center top-[20%] right-[25%]">{notificationBadge}</div> : null}
                <BellIcon className="size-7"/>
            </Link>
            <Link prefetch={false} className="p-3  text-sm-primary-dark dark:text-sm-white" href={`/${user?.username}`}><UserCircleIcon className="size-7"/></Link>
        </div>
    )
}
