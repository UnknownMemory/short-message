'use client'
import Link from "next/link"

export const Navbar = ({ css = null }: { css: string | null }) => {
    return (
        <div className="md:h-16 sticky top-0 bg-sm-white z-[1] max-sm:hidden">
            <Link prefetch={false} className="font-bold self-center md:ml-5 text-sm-primary-dark" href="/">Short Message</Link>
        </div>
    )
}
