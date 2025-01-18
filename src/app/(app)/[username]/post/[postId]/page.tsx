"use client"
import { useParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getCurrentUser, getPost } from "@/utils/service";
import { Post } from "@/components/Post";


export default function UserPost() {
    const params = useParams()
    const qClient = useQueryClient()
    
    const {data: me} = useQuery({
        queryKey: ['me'],
        queryFn: () => getCurrentUser(),
        initialData: () => {
            return qClient.getQueryData(['me'])
        },
        staleTime: Infinity,
    })

    const {data: post} = useQuery({
        queryKey: ['post', params.postId],
        queryFn: () => getPost(Number(params.postId)),
        initialData: () => {
            return qClient.getQueryData(['post', params.postId])
        },
        staleTime: Infinity,
    })



    return (
        <div id="feed" className="border-x-[1px]">
        <nav className="grid grid-cols-3 w-full h-14 border-x-[1px] border-b-[1px]">

            <div className="text-center self-center md:col-span-1">Post</div>
        </nav> 
        <div>
            {post ? <Post post={post} isTimeline={false}></Post> : null}
        </div>
        </div>
    );
}
