"use client"
import { useParams, useRouter } from "next/navigation";

import { useCurrentUserQuery } from "@/queries/user";
import { usePostQuery } from "@/queries/post";
import { Post } from "@/components/Post";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";



export default function UserPost() {
    const params = useParams()
    const router = useRouter()
    
    const {data: me} = useCurrentUserQuery()

    const {data: post} = usePostQuery(Number(params.postId))

    return (
        <div id="feed" className="md:border-x-[1px]">
        <nav className="grid grid-cols-3 w-full h-14 md:border-x-[1px] border-b-[1px]">
            <div className="self-center ml-4">
                <button type="button" onClick={router.back} >
                    <ArrowLeftIcon className="size-5 inline"></ArrowLeftIcon>
                </button>
                <div className="md:text-lg md:col-span-1 inline md:ml-4">Post</div>
            </div>
        </nav> 
        <div>
            {post ? <Post post={post} currentUserId={me.id} isTimeline={false} onDelete={() => router.replace('/')}></Post> : null}
        </div>
        </div>
    );
}
