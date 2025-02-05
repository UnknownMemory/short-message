"use client"
import Image from "next/image"
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/16/solid"

export const NotificationCard = ({notification}: any) => {
    return (
        <div className="md:p-2 flex border-b-[1px]">
            <div className="md:w-14 md:pr-1 text-sm-primary flex justify-end"><SolidHeartIcon className="size-8"/></div>
            <div>
                <div className="h-[32px] w-[32px] relative">
                    <Image className="rounded-full" src="/default_avatar.jpg" fill style={{objectFit: "cover"}} alt="Profile Picture" loading="lazy"></Image>
                </div>
                <div className="text-sm pt-1">{notification.total == 1 ? `${notification.latestNotifier.username} liked your post` : `${notification.latestNotifier.username} and ${notification.total-1} others liked your post`}</div>
                <div className="text-sm pt-1 text-sm-dark-gray">{notification.post.text}</div>
            </div>
        </div>
    )
}
