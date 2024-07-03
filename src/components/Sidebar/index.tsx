'use client'
import { useQuery } from "@tanstack/react-query"

import { getCurrentUser } from "@/utils/service"
import Link from "next/link"


export const Sidebar = () => {
    const {data: user} = useQuery({
        queryKey: ['me'],
        queryFn: () => getCurrentUser(),
        staleTime: Infinity,
    })
    return (
        <div className="mr-6">
            <nav className="text-xl flex flex-col">
                <Link className="pt-6" href="/">Home</Link>
                <Link className="pt-6" href="#">Notifications</Link>
                <Link className="pt-6" href="/logout">Logout</Link>
            </nav>
        </div>
    )
}
