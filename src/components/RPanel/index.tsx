'use client'
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

import { ArrowRightEndOnRectangleIcon, BellIcon, Cog6ToothIcon, UserCircleIcon, ChevronDownIcon} from "@heroicons/react/24/outline"
import { useQuery } from "@tanstack/react-query"

import { getCurrentUser } from "@/utils/service"


export const RPanel = () => {

    const [showDropdown, setShowDropdown] = useState(false)
    
    const {data: user} = useQuery({
        queryKey: ['me'],
        queryFn: () => getCurrentUser(),
        staleTime: Infinity,
    })
    return (
        <div className="md:h-14 sticky top-0 bg-sm-white z-[1] max-sm:hidden flex items-center justify-end">
            <div className="flex justify-end items-center md:mr-2 text-sm">
                <Link prefetch={false} className={`user-dropdown flex justify-center items-center p-2 rounded-2xl relative cursor-pointer border h-[50px] mr-1 text-sm-primary-dark`} href="/notifications">
                    <BellIcon className="size-5 m-[5px]"/>
                    <div className="select-none">Notifications</div>
                </Link>

                <div className={`user-dropdown flex justify-center items-center p-2 rounded-2xl relative cursor-pointer border h-[50px]`} onClick={() => setShowDropdown(!showDropdown)}>
                    <div className="h-[32px] w-[32px] relative md:mr-1">
                        <Image className="rounded-full" src="/default_avatar.jpg" fill style={{objectFit: "cover"}} alt="Profile Picture" loading="lazy"></Image>
                    </div>
                    <div className="select-none">{user?.username}</div>
                    <ChevronDownIcon className="ml-2 size-4"></ChevronDownIcon>

                    {showDropdown &&
                        <div className="user-dropdown-link absolute w-full rounded-2xl md:top-14 border">
                            <Link prefetch={false} className="md:p-3 flex items-center text-sm-primary-dark rounded-t-2xl nav-link border-b" href={`/${user?.username}`}><UserCircleIcon className="size-5"/>Profile</Link>
                            <Link prefetch={false} className="md:p-3 flex items-center text-sm-primary-dark nav-link border-b" href="/settings"><Cog6ToothIcon className="size-5"/>Settings</Link>
                            <Link prefetch={false} className="md:p-3 flex items-center text-sm-primary-dark rounded-b-2xl nav-link " href="/logout"><ArrowRightEndOnRectangleIcon className="size-5"/>Logout</Link>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}
