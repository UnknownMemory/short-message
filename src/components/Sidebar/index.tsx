'use client'
import Link from "next/link"
import Image from "next/image"

import { useQuery } from "@tanstack/react-query"
import { HomeIcon, ArrowRightEndOnRectangleIcon, BellIcon, Cog6ToothIcon, UserCircleIcon } from "@heroicons/react/24/outline"

import { getCurrentUser } from "@/utils/service"


export const Sidebar = () => {
    const {data: user} = useQuery({
        queryKey: ['me'],
        queryFn: () => getCurrentUser(),
        staleTime: Infinity,
    })
    return (
        <div className="md:w-44 mr-6 justify-self-end">
            <nav className="md:text-lg flex flex-col md:mt-5">
                <Link className="md:h-11 md:px-2 md:rounded-md flex items-center text-sm-primary-dark"  href={`/${user?.username}`}>
                    <div className="h-[44px] w-[44px] relative md:mr-2">
                        <Image className="rounded-full" src="/default_avatar.jpg" fill style={{objectFit: "cover"}} alt="Profile Picture" loading="lazy"></Image>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm">{user?.display_name}</span>
                        <span className="text-sm text-sm-dark-gray">@{user?.username}</span>
                    </div>
                </Link>
                <Link prefetch={false} className="md:h-11 md:px-2 md:mt-4 md:rounded-md flex items-center text-sm-primary-dark nav-link" href="/">
                    <HomeIcon className="size-6 mr-1"/>
                    <span>Home</span>
                </Link>
                <Link prefetch={false} className="md:h-11 md:px-2 md:rounded-md flex items-center text-sm-primary-dark nav-link" href="/notifications">
                    <BellIcon className="size-6 mr-1"/>
                    <span>Notifications</span>
                </Link>
                <Link prefetch={false} className="md:h-11 md:px-2 md:rounded-md flex items-center text-sm-primary-dark nav-link" href={`/${user?.username}`}>
                    <UserCircleIcon className="size-6 mr-1"/>
                    <span>Profile</span>
                </Link>
                <Link prefetch={false} className="md:h-11 md:px-2 md:rounded-md flex items-center text-sm-primary-dark nav-link" href="/settings">
                    <Cog6ToothIcon className="size-6 mr-1"/>
                    <span>Settings</span>
                </Link>
                <Link prefetch={false} className="md:h-11 md:px-2 md:rounded-md flex items-center text-sm-primary-dark nav-link" href="/logout">
                    <ArrowRightEndOnRectangleIcon className="size-6 mr-1"/>
                    <span>Logout</span>
                </Link>
            </nav>
        </div>
    )
}
