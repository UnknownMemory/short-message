"use client"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { Virtuoso } from 'react-virtuoso'

import { Post } from "@/components/Post";
import { PostInput } from "@/components/PostInput";
import { getCurrentUser, getTimeline } from "@/utils/service";
import { Post as PostT } from "@/types/Post";
import { Bars3Icon } from "@heroicons/react/24/outline";


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
                <nav className="grid grid-cols-3 w-full h-14 border-x-[1px] border-b-[1px]">
                    <Bars3Icon className="size-6 self-center ml-4 md:hidden"/>
                    <div className="text-center self-center col-span-3">Feed</div>
                </nav> 
                <PostInput refetch={refetch}/>
                <Virtuoso 
                    useWindowScroll
                    style={{height: '100%'}}
                    data={posts} 
                    itemContent={(_, post: PostT) =>{ return <Post key={post.id} post={post}/>}}
                    endReached={(_) => fetchNextPage()}
                    />
            </div>
        </>
    );
}
