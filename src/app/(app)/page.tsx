"use client"
import Image from 'next/image';

import { Bars3Icon } from "@heroicons/react/24/outline";
import { Virtuoso } from 'react-virtuoso'

import { Post } from "@/components/Post";
import { PostInput } from "@/components/PostInput";
import { Post as PostT } from "@/types/Post";

import { useCurrentUserQuery } from '@/queries/user';
import { useSidebarStore } from "@/stores/sidebar-store";
import { useTimelineQuery } from '@/queries/post';


export default function Home() {
    const {setIsOpen} = useSidebarStore((state) => state)

    const {data: me} = useCurrentUserQuery()
    const {data: postsPages, fetchNextPage, refetch} = useTimelineQuery(!!me?.id)

    const posts = postsPages?.pages.flatMap(page => {
        return page.posts
    })
    return (
        <>
            <div id="feed" className="min-h-full md:border-x-[1px]">
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
                    itemContent={(_, post: PostT) =>{ return <Post key={post.id} post={post} isTimeline={true} currentUserId={me.id} onDelete={refetch}/>}}
                    endReached={(_) => fetchNextPage()}
                    />
            </div>
        </>
    );
}
