"use client"
import { useQuery } from "@tanstack/react-query";

import { Post } from "@/components/Post";
import { PostInput } from "@/components/PostInput";
import { getCurrentUser, getTimeline } from "@/utils/service";


export default function Home() {
    const {data: user} = useQuery({
        queryKey: ['me'],
        queryFn: () => getCurrentUser(),
        staleTime: Infinity,
    })

    const userId = user?.id

    const {data: posts, refetch} = useQuery({
        queryKey: ['posts'],
        queryFn: () => getTimeline(),
        enabled: !!userId
    })
    return (
        <div id="feed" className="min-h-full ">
            <PostInput userId={userId} refetch={refetch}/>
            <div className="flex flex-col">
                {posts?.posts.map((post: Post) => (
                    <Post key={post.id} post={post}/>
                ))}

            </div>
        </div>
    );
}
