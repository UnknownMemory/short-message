'use client'
import { useQuery } from "@tanstack/react-query"

import { getCurrentUser } from "@/utils/service"
import Link from "next/link"
import { HomeIcon, ArrowRightEndOnRectangleIcon, BellIcon, Cog6ToothIcon, UserCircleIcon } from "@heroicons/react/24/outline"



export const Sidebar = ({ css = null }: { css: string | null }) => {
    const {data: user} = useQuery({
        queryKey: ['me'],
        queryFn: () => getCurrentUser(),
        staleTime: Infinity,
    })
    return (
        <div className={css != null ? 'md:w-1/3 md:mr-12 '+ css : 'md:w-1/3 r-6'}>
            <nav className="text-xl flex flex-col md:mt-5">
                <Link className="md:p-2 flex items-center text-sm-primary-dark nav-link" href="/"><HomeIcon className="size-6"/>Home</Link>
                <Link className="md:p-2 flex items-center text-sm-primary-dark nav-link" href="/notifications"><BellIcon className="size-6"/>Notifications</Link>
                <Link className="md:p-2 flex items-center text-sm-primary-dark nav-link" href={`/${user?.username}`}><UserCircleIcon className="size-6"/>Profile</Link>
                <Link className="md:p-2 flex items-center text-sm-primary-dark nav-link" href="/settings"><Cog6ToothIcon className="size-6"/>Settings</Link>
                <Link className="md:p-2 flex items-center text-sm-primary-dark nav-link" href="/logout"><ArrowRightEndOnRectangleIcon className="size-6"/>Logout</Link>
            </nav>
        </div>
    )
}
