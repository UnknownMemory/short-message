'use client'
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { HeartIcon } from "@heroicons/react/24/outline"
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/16/solid"

import { likeAction } from "./actions"


interface Props {
    post: Post & Partial<User>,
}

export const Post = ({post}: Props) => {
    const [isLiked, setIsLiked] = useState<boolean>(!post.isLiked || post.isLiked == null ? false : true )

    const postDate = new Date(post?.created_at)
    const dayLater = postDate.getTime() + (24*60*60*1000)

    const hourPosted = postDate.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit', timeZone: 'Europe/Paris'}) 
    const dayPosted = postDate.toLocaleTimeString('fr-FR', {day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit'})
    const createdAt = dayLater < new Date().getTime() ? dayPosted : hourPosted

    const handleLike = async () => {
        const newLike = await likeAction(post.id)

        if(typeof newLike === "object"){
            return newLike.errors
        }

        setIsLiked(newLike)
    }

    return (
        <div className="flex px-3 py-5 border-b-[1px]">
            <div className="h-full pr-2">
            <div className="h-[42px] w-[42px] relative">
                <Image className="rounded-full" src="/default_avatar.jpg" fill style={{objectFit: "cover"}} alt="Profile Picture" loading="lazy"></Image>
            </div>
            </div>
            <div className="w-full text-[0.9em]">
                <div className="flex items-center justify-between">
                    <div className="flex">
                        <Link className="post" href={"/"+post.username}><span className="pr-1">{post.display_name}</span></Link>
                        <div className="text-sm-dark-gray flex items-center">
                            <span className="truncate inline-block max-w-24 md:max-w-full">@{post.username}</span>
                            <span className="px-0.5">·</span>
                            <span className="truncate inline-block max-w-20 md:max-w-full">{createdAt}</span>
                        </div>
                    </div>
                    {isLiked ?
                        <div className="w-[16px] md:w-[18px]  text-sm-primary cursor-pointer" onClick={handleLike}><SolidHeartIcon/></div> :
                        <div className="w-[16px] md:w-[18px] text-sm-dark-gray cursor-pointer" onClick={handleLike}><HeartIcon/></div>
                    }

                </div>
                <span className="whitespace-pre-wrap">{post.text}</span>
            </div>
        </div>
    )
}
