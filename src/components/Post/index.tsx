"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

import { HeartIcon } from "@heroicons/react/24/outline"
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid"

import { addLikeAction, removeLikeAction } from "./actions"
import { User } from "@/types/User"
import { Post as PostT } from "@/types/Post"
import { EllipsisVerticalIcon } from "@heroicons/react/16/solid"
import { PostTooltip} from "./PostTooltip"


interface Props {
    post: PostT & Partial<User>,
    isTimeline: boolean
    currentUserId: number
    onDelete: Function
}

export const Post = ({post, isTimeline, currentUserId, onDelete}: Props) => {
    const router = useRouter()
    const [isLiked, setIsLiked] = useState<boolean>(!post.isLiked || post.isLiked == null ? false : true )
    const [isOpen, setIsOpen] = useState(false)

    const postDate = new Date(post?.created_at)
    const dayLater = postDate.getTime() + (24*60*60*1000)

    const hourPosted = postDate.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit', timeZone: 'Europe/Paris'}) 
    const dayPosted = postDate.toLocaleTimeString('fr-FR', {day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute:'2-digit'})
    const createdAt = dayLater < new Date().getTime() ? dayPosted : hourPosted


    const addLike = async () => {
        await addLikeAction(post.id)

        return setIsLiked(true)
    }

    const removeLike = async () => {
        await removeLikeAction(post.id)
        return setIsLiked(false)
    }

    const openTooltip = () => {
        setIsOpen(true)
    }

    const closeTooltip = () => {
        setIsOpen(false)
        onDelete()
    }

    return (
        <div className={`flex px-3 py-5 border-b-[1px] relative cursor-pointer ${isTimeline ? 'hover:bg-sm-primary/[0.1]' : ''}`} onClick={(e) => {
            if(isTimeline){
                router.push(`/${post.username}/post/${post.id}`)
            }
        }}>
            <div className="h-full pr-2">
            <div className="h-[42px] w-[42px] relative">
                <Image className="rounded-full" src="/default_avatar.jpg" fill style={{objectFit: "cover"}} alt="Profile Picture" loading="lazy"></Image>
            </div>
            </div>
            <div className="w-full text-[15px]">
                <div className="flex items-center justify-between">
                    <div className="flex">
                        <Link prefetch={false} className="post" href={`/${post.username}`} passHref onClick={(e) => {e.stopPropagation(); router.push(`/${post.username}`)}}><span className="pr-1">{post.display_name}</span></Link>
                        <div className="text-sm-dark-gray flex items-center">
                            <span className="truncate inline-block max-w-24 md:max-w-full">@{post.username}</span>
                            <span className="px-0.5">·</span>
                            <span className="truncate inline-block max-w-16 md:max-w-full">{createdAt}</span>
                        </div>
                    </div>
                    <div className="flex">
                        <div className={`flex items-center cursor-pointer rounded-full ${isLiked ? 'text-sm-primary hover:text-sm-primary/[0.5]': 'text-sm-dark-gray hover:text-sm-dark-gray/[0.5]'}`} onClick={(e) => {e.stopPropagation(); isLiked ? removeLike() : addLike()}}>
                            {isLiked ? <SolidHeartIcon width={18} height={18}/> : <HeartIcon width={18} height={18}/>}
                            <span className="pl-1">{post.likes}</span>
                        </div>
                        <div className="flex items-center ml-1 text-sm-dark-gray relative min-w-max rounded-full hover:text-sm-dark-gray/[0.5]">
                            <EllipsisVerticalIcon width={20} height={20} onClick={(e) => {e.stopPropagation(); isOpen ? closeTooltip() : openTooltip()}}/>
                            {post.authorID == currentUserId && post.id && isOpen && (
                                <PostTooltip postId={post.id} closeTooltip={closeTooltip}/>
                            )}
                        </div>
                    </div>

                </div>
                <span className="whitespace-pre-wrap break-words word-break-words">{post.text}</span>
            </div>
        </div>
    )
}
