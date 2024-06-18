"use client"
import { useQuery } from "@tanstack/react-query";

import { Post } from "@/components/Post";
import { PostInput } from "@/components/PostInput";
import { getCurrentUser } from "@/utils/service";


export default function Home() {
    const {data, isLoading, error} = useQuery({
        queryKey: ['me'],
        queryFn: () => getCurrentUser(),
        staleTime: Infinity,
    })
    return (
        <main className="min-h-screen flex justify-center">
            <div id="feed" className="min-h-full md:w-[35%] w-[90%]">
                <PostInput userId={data?.id}/>
            <div className="flex flex-col">
                <Post />
            </div>
            </div>
        </main>
    );
}
