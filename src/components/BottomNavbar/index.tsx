'use client'
import Link from "next/link"

import { useQuery } from "@tanstack/react-query"
import { UserCircleIcon, HomeIcon, BellIcon } from "@heroicons/react/16/solid"

import { getCurrentUser } from "@/utils/service"


export const BottomNavbar = () => {
    const {data: user} = useQuery({
        queryKey: ['me'],
        queryFn: () => getCurrentUser(),
        staleTime: Infinity,
    })

    return (
        <div className="max-sm:visible invisible w-full border-t-[1px] sticky bottom-0 bg-sm-white flex items-center justify-between px-[25%]">
            <Link className="p-3  text-sm-primary-dark" href='/'><HomeIcon className="size-7"/></Link>
            <Link className="p-3  text-sm-primary-dark" href='/notifications'><BellIcon className="size-7"/></Link>
            <Link className="p-3  text-sm-primary-dark" href={`/${user?.username}`}><UserCircleIcon className="size-7"/></Link>
        </div>
    )
}
