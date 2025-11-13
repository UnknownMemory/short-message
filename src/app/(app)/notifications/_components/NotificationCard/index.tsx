"use client"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

import { HeartIcon as SolidHeartIcon } from "@heroicons/react/16/solid"


export const NotificationCard = ({notification, username}: any) => {
   const router = useRouter()
    return (
        <div className="md:p-2 px-3 py-3 flex border-b-[1px] cursor-pointer" onClick={() => {if(notification.type == "like"){router.push(`/${username}/post/${notification.post.postId}`)}}}>
            <div className="md:w-14 md:pr-1 text-sm-primary flex justify-end"><SolidHeartIcon className="size-8"/></div>
            <div className="w-full">
                <div className="h-[32px] w-[32px] relative">
                    <Image className="rounded-full" src="/default_avatar.jpg" fill style={{objectFit: "cover"}} alt="Profile Picture" loading="lazy"></Image>
                </div>
                <div className="text-sm pt-1">
                    <Link prefetch={false} className="post" passHref href={`/${notification.latestnotifier.username}`} onClick={(e) => {e.stopPropagation(); router.push(`/${notification.latestnotifier.username}`)}}>{notification.latestnotifier.username}</Link>
                    {notification.total == 1 ? ` liked your post` : ` and ${notification.total-1} others liked your post`}
                </div>
                <div className="text-sm pt-1 text-sm-dark-gray whitespace-pre-wrap break-words word-break-words">{notification.post.text}</div>
            </div>
        </div>
    )
}
