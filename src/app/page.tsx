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

    const {data: posts} = useQuery({
        queryKey: ['posts'],
        queryFn: () => getTimeline(),
        enabled: !!userId
    })
    return (
        <div id="feed" className="min-h-full md:w-[35%] w-[90%]">
            <PostInput userId={userId}/>
            <div className="flex flex-col">
                {posts?.posts.map((post: Post) => (
                    <Post key={post.id} post={post}/>
                ))}

            </div>
        </div>
    );
}
