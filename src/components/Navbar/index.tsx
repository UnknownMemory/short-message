'use client'
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

import { ArrowRightEndOnRectangleIcon, BellIcon, Cog6ToothIcon, UserCircleIcon, ChevronDownIcon} from "@heroicons/react/24/outline"
import { useQuery } from "@tanstack/react-query"

import { getCurrentUser } from "@/utils/service"
import { usePathname } from "next/navigation"




export const Navbar = ({ css = null }: { css: string | null }) => {
    const pathname = usePathname()
    const [showDropdown, setShowDropdown] = useState(false)
    
    const {data: user} = useQuery({
        queryKey: ['me'],
        queryFn: () => getCurrentUser(),
        staleTime: Infinity,
    })
    return (
        <div className="md:h-16 sticky top-0 bg-sm-white z-[1] max-sm:hidden">
            <Link className="font-bold self-center md:ml-5 text-sm-primary-dark" href="/">Short Message</Link>
        </div>
    )
}
