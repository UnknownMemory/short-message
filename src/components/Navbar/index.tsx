'use client'
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

import { HomeIcon, ArrowRightEndOnRectangleIcon, BellIcon, Cog6ToothIcon, UserCircleIcon, ChevronDownIcon} from "@heroicons/react/24/outline"
import { useQuery } from "@tanstack/react-query"

import { getCurrentUser } from "@/utils/service"




export const Navbar = ({ css = null }: { css: string | null }) => {
    const [showDropdown, setShowDropdown] = useState(false)
    
    const {data: user} = useQuery({
        queryKey: ['me'],
        queryFn: () => getCurrentUser(),
        staleTime: Infinity,
    })
    return (
        <div className="md:grid md:sm-grid md:h-16 sticky top-0 bg-sm-white z-[1] max-sm:invisible">
            <Link className="font-bold self-center md:ml-5 text-sm-primary-dark" href="/">Short Message</Link>
            <nav className=" flex justify-center items-center border-x-[1px] border-b-[1px]">
                <Link className="w-[50%] h-full md:p-2 flex items-center justify-center text-sm-primary-dark nav-link" href="/"><HomeIcon className="size-5 mr-1"/>Home</Link>
                <Link className="w-[50%] h-full md:p-2 flex items-center justify-center text-sm-primary-dark nav-link" href="/notifications"><BellIcon className="size-5 mr-1"/>Notifications</Link>

            </nav>
            <div className="flex justify-end items-center md:mr-2 text-sm">
                <div className={`user-dropdown flex justify-center items-center p-2 rounded-2xl relative cursor-pointer border`} onClick={() => setShowDropdown(!showDropdown)}>
                    <div className="h-[32px] w-[32px] relative md:mr-1">
                        <Image className="rounded-full" src="/default_avatar.jpg" fill style={{objectFit: "cover"}} alt="Profile Picture" loading="lazy"></Image>
                    </div>
                    <div className="select-none">{user?.username}</div>
                    <ChevronDownIcon className="ml-2 size-4"></ChevronDownIcon>

                    {showDropdown &&
                        <div className="user-dropdown-link absolute w-full rounded-2xl md:top-14 border">
                            <Link className="md:p-3 flex items-center text-sm-primary-dark rounded-t-2xl nav-link border-b" href={`/${user?.username}`}><UserCircleIcon className="size-5"/>Profile</Link>
                            <Link className="md:p-3 flex items-center text-sm-primary-dark nav-link border-b" href="/settings"><Cog6ToothIcon className="size-5"/>Settings</Link>
                            <Link className="md:p-3 flex items-center text-sm-primary-dark rounded-b-2xl nav-link " href="/logout"><ArrowRightEndOnRectangleIcon className="size-5"/>Logout</Link>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}
