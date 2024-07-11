'use client'
import { HeartIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { likeAction } from "./actions"

interface Props {
    post: Post & Partial<User>,
}


export const Post = ({post}: Props) => {
    const postDate = new Date(post?.created_at)
    const dayLater = new Date().getTime() + (24*60*60*1000)

    const hourPosted = postDate.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit', timeZone: 'Europe/Paris'}) 
    const dayPosted = postDate.toLocaleTimeString('fr-FR', {day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit'})

    const createdAt = dayLater > postDate.getTime() ? hourPosted : dayPosted

    return (
        <div className="flex md:p-3 md:my-5 bg-sm-light-gray rounded-xl">
            <div className="h-full pr-2">
            <div className="h-[42px] w-[42px] relative">
                <Image className="rounded-full" src="/default_avatar.jpg" fill style={{objectFit: "cover"}} alt="Profile Picture" loading="lazy"></Image>
            </div>
            </div>
            <div className="w-full text-[0.9em]">
                <div className="flex items-center justify-between">
                    <div className="flex">
                        <span className="pr-1">{post.display_name}</span>
                        <div className="text-sm-dark-gray">
                            <span className="">@{post.username}</span>
                            <span className="px-0.5">·</span>
                            <span className="">{createdAt}</span>
                        </div>
                    </div>
                    <div className="md:w-[16px] text-sm-dark-gray cursor-pointer" onClick={() => likeAction(post.id)}><HeartIcon/></div>
                </div>
                <span className="whitespace-pre-wrap">{post.text}</span>
            </div>
        </div>
    )
}
