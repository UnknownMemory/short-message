"use client"
import { useParams, useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getPost } from "@/utils/service";
import { Post } from "@/components/Post";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useCurrentInfoQuery } from "@/queries/user";


export default function UserPost() {
    const params = useParams()
    const qClient = useQueryClient()
    const router = useRouter()
    
    const {data: me} = useCurrentInfoQuery()

    const {data: post} = useQuery({
        queryKey: ['post', params.postId],
        queryFn: () => getPost(Number(params.postId)),
        initialData: () => {
            return qClient.getQueryData(['post', params.postId])
        },
        staleTime: Infinity,
    })

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
            {post ? <Post post={post} isTimeline={false}></Post> : null}
        </div>
        </div>
    );
}
