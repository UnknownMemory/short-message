'use client'
import { useQuery } from "@tanstack/react-query"

import { getCurrentUser } from "@/utils/service"
import Link from "next/link"
import { HomeIcon, ArrowRightEndOnRectangleIcon, BellIcon, Cog6ToothIcon, UserCircleIcon } from "@heroicons/react/24/outline"



export const Navbar = ({ css = null }: { css: string | null }) => {
    const {data: user} = useQuery({
        queryKey: ['me'],
        queryFn: () => getCurrentUser(),
        staleTime: Infinity,
    })
    return (
        <div className="md:grid md:sm-grid md:h-16">
            <div className="text-lg self-center md:ml-5">Short Message</div>
            <nav className="text-base flex justify-center items-center border-x-[1px] border-b-[1px]">
                <Link className="w-[50%] h-full md:p-2 flex items-center justify-center text-sm-primary-dark nav-link" href="/"><HomeIcon className="size-5 mr-1"/>Home</Link>
                <Link className="w-[50%] h-full md:p-2 flex items-center justify-center text-sm-primary-dark nav-link" href="/notifications"><BellIcon className="size-5 mr-1"/>Notifications</Link>
                {/* <Link className="md:p-2 flex items-center text-sm-primary-dark nav-link" href={`/${user?.username}`}><UserCircleIcon className="size-6"/>Profile</Link> */}
                {/* <Link className="md:p-2 flex items-center text-sm-primary-dark nav-link" href="/settings"><Cog6ToothIcon className="size-6"/>Settings</Link> */}
                {/* <Link className="md:p-2 flex items-center text-sm-primary-dark nav-link" href="/logout"><ArrowRightEndOnRectangleIcon className="size-6"/>Logout</Link> */}
            </nav>
        </div>
    )
}
