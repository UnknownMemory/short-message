'use client'
import Link from "next/link"
import Image from "next/image"

import { useQuery } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
import { HomeIcon, ArrowRightEndOnRectangleIcon, BellIcon, Cog6ToothIcon, UserCircleIcon } from "@heroicons/react/24/outline"
import { HomeIcon as HomeIconSolid,
         BellIcon as BellIconSolid,
         Cog6ToothIcon as Cog6ToothIconSolid,
         UserCircleIcon as UserCircleIconSolid } from "@heroicons/react/24/solid"

import { getCurrentUser } from "@/utils/service"
import { useSidebarStore } from "@/stores/sidebar-store"



export const Sidebar = () => {
    const pathname = usePathname()
    const {isOpen, setIsOpen} = useSidebarStore((state) => state)
    const {data: user} = useQuery({
        queryKey: ['me'],
        queryFn: () => getCurrentUser(),
        staleTime: Infinity,
    })

    return (
        <div className={`md:w-44 md:mr-6 md:justify-self-end md:static md:border-0 md:block md:bg-sm-white fixed top-0 left-0 w-full bg-sm-primary/[0.2] h-full z-10 border-r-[1px] ${isOpen ? 'block': 'hidden'}`}
            onClick={(e) => {
                if(e.target == e.currentTarget) {
                    setIsOpen(false)
                }}
            }>
            <nav className="md:text-lg md:static fixed top-0 left-0 flex flex-col md:mt-5 bg-sm-white h-full text-xl">
                <Link prefetch={false} onClick={() => setIsOpen(false)} className="md:h-11 md:px-2 px-5 pt-3 md:rounded-md flex items-center text-sm-primary-dark"  href={`/${user?.username}`}>
                    <div className="h-[44px] w-[44px] relative mr-2">
                        <Image className="rounded-full" src="/default_avatar.jpg" fill style={{objectFit: "cover"}} alt="Profile Picture" loading="lazy"></Image>
                    </div>
                    <div className="flex flex-col">
                        <span className="md:text-sm text-lg font-bold">{user?.display_name}</span>
                        <span className="text-sm text-sm-dark-gray">@{user?.username}</span>
                    </div>
                </Link>
                <Link prefetch={false} onClick={() => setIsOpen(false)} className="md:h-11 md:px-2 px-5 py-3 md:mt-4 md:rounded-md flex items-center text-sm-primary-dark nav-link" href="/">
                    {pathname == '/' ? <HomeIconSolid className="size-6 mr-1"/> : <HomeIcon className="size-6 mr-1"/>}
                    {pathname == '/' ? <span className="font-bold">Home</span> : <span>Home</span>}
                </Link>
                <Link prefetch={false} onClick={() => setIsOpen(false)} className="md:h-11 md:px-2 px-5 py-3 md:rounded-md flex items-center text-sm-primary-dark nav-link" href="/notifications">
                    {pathname == '/notifications' ? <BellIconSolid className="size-6 mr-1"/> : <BellIcon className="size-6 mr-1"/>}
                    {pathname == '/notifications' ? <span className="font-bold">Notifications</span> : <span>Notifications</span>}
                </Link>
                <Link prefetch={false} onClick={() => setIsOpen(false)} className="md:h-11 md:px-2 px-5 py-3 md:rounded-md flex items-center text-sm-primary-dark nav-link" href={`/${user?.username}`}>
                    {pathname == `/${user?.username}` ? <UserCircleIconSolid className="size-6 mr-1"/> : <UserCircleIcon className="size-6 mr-1"/>}
                    {pathname == `/${user?.username}` ? <span className="font-bold">Profile</span> : <span>Profile</span>}
                </Link>
                <Link prefetch={false} onClick={() => setIsOpen(false)} className="md:h-11 md:px-2 px-5 py-3 md:rounded-md flex items-center text-sm-primary-dark nav-link" href="/settings">
                    {pathname == '/settings' ? <Cog6ToothIconSolid className="size-6 mr-1"/> : <Cog6ToothIcon className="size-6 mr-1"/>}
                    {pathname == '/settings' ? <span className="font-bold">Settings</span> : <span>Settings</span>}
                </Link>
                <Link prefetch={false} onClick={() => setIsOpen(false)} className="md:h-11 md:px-2 px-5 py-3 md:rounded-md flex items-center text-sm-primary-dark nav-link" href="/logout">
                    <ArrowRightEndOnRectangleIcon className="size-6 mr-1"/>
                    <span>Logout</span>
                </Link>
            </nav>
        </div>
    )
}
