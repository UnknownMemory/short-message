"use client"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Virtuoso } from 'react-virtuoso'

import { Post } from "@/components/Post";
import { PostInput } from "@/components/PostInput";
import { getCurrentUser, getTimeline } from "@/utils/service";
import { useEffect } from "react";
import { usePathname } from "next/navigation";


export default function Home() {
    const pathname = usePathname()

    const {data: user} = useQuery({
        queryKey: ['me'],
        queryFn: () => getCurrentUser(),
        staleTime: Infinity,
    })

    const userId = user?.id

    const {data: postsPages, fetchNextPage, refetch} = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({pageParam}) => getTimeline(pageParam),
        initialPageParam: false,
        getNextPageParam: (lastPage, pages) => lastPage.cursor,
        getPreviousPageParam: (firstPage, pages) => firstPage.cursor,
        enabled: !!userId,
        staleTime: Infinity
    })

    const posts = postsPages?.pages.flatMap(page => {
        return page.posts
    })


    return (
        <>
            <div id="feed" className="min-h-full border-x-[1px]">
                <nav className="h-14 flex justify-center items-center border-x-[1px] border-b-[1px]">
                    {pathname == '/' ? <div className="w-[50%] h-full md:p-2 flex items-center justify-center">Feed</div> : false}
                </nav> 
                <PostInput refetch={refetch}/>
                <Virtuoso 
                    useWindowScroll
                    style={{height: '100%'}}
                    data={posts} 
                    itemContent={(_, post: Post) =>{ return <Post key={post.id} post={post}/>}}
                    endReached={(_) => fetchNextPage()}
                    />
            </div>
        </>
    );
}
