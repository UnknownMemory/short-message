"use client"
import Image from 'next/image';

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { Virtuoso } from 'react-virtuoso'

import { Post } from "@/components/Post";
import { PostInput } from "@/components/PostInput";
import { getCurrentUser, getTimeline } from "@/utils/service";
import { Post as PostT } from "@/types/Post";

import { useSidebarStore } from "@/stores/sidebar-store";


export default function Home() {
    const {setIsOpen} = useSidebarStore((state) => state)
    const pathname = usePathname()

    const {data: user} = useQuery({
        queryKey: ['me'],
        queryFn: () => getCurrentUser(),
        staleTime: Infinity,
    })

    

    const {data: postsPages, fetchNextPage, refetch} = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({pageParam}) => getTimeline(pageParam),
        initialPageParam: false,
        getNextPageParam: (lastPage, pages) => lastPage.cursor,
        getPreviousPageParam: (firstPage, pages) => firstPage.cursor,
        enabled: !!user?.id,
        staleTime: Infinity
    })

    const posts = postsPages?.pages.flatMap(page => {
        return page.posts
    })


    return (
        <>
            <div id="feed" className="min-h-full border-x-[1px]">
                <nav className="grid grid-cols-3 w-full h-14 border-b-[1px]">
                    <Bars3Icon className="size-6 self-center ml-4 md:hidden" onClick={() => setIsOpen(true)}/>
                    <div className="flex justify-center md:col-span-3 cursor-pointer" onClick={() => refetch()}>
                        <Image src="/logo.svg" alt="Short Message logo" width={28} height={28}/>
                    </div>
                </nav> 
                <PostInput refetch={refetch}/>
                <Virtuoso 
                    useWindowScroll
                    style={{height: '100%'}}
                    data={posts} 
                    itemContent={(_, post: PostT) =>{ return <Post key={post.id} post={post} isTimeline={true}/>}}
                    endReached={(_) => fetchNextPage()}
                    />
            </div>
        </>
    );
}
