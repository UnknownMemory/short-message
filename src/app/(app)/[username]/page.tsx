"use client"

import { useParams } from 'next/navigation'
import Image from "next/image"
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";

import { getUser, userTimeline } from "@/utils/service";
import { Virtuoso } from 'react-virtuoso';
import { Post } from '@/components/Post';


export default function Home() {
    const params = useParams()
    
    const {data: user} = useQuery({
        queryKey: ['profile', params.username],
        queryFn: () => getUser(params.username),
        staleTime: Infinity,
    })

    const userId = user?.id

    const {data: postsPages, fetchNextPage, refetch} = useInfiniteQuery({
        queryKey: ['profile_posts', params.username],
        queryFn: ({pageParam}) => userTimeline(userId, pageParam),
        initialPageParam: false,
        getNextPageParam: (lastPage, pages) => lastPage.cursor,
        getPreviousPageParam: (firstPage, pages) => firstPage.cursor,
        enabled: !!userId
    })

    const posts = postsPages?.pages.flatMap(page => {
        return page.posts
    })

    return (
        <div id="profile" className="min-h-full">
            <div>
                <div className="h-[142px] w-full">
                    <div className="w-full h-full bg-slate-500"></div>
                </div>
                {/* <div className="w-100 md:p-2 float-right">
                    <button className="btn-light">Follow</button>
                </div> */}
                <div>
                    <div className="flex flex-col items-center">
                        <div id="avatar" className="absolute md:top-[96px]">
                            <div className="md:h-[90px] md:w-[90px] relative">
                                <Image className="rounded-full" src="/default_avatar.jpg" fill style={{objectFit: "cover"}} alt="Profile Picture" loading="lazy"></Image>
                            </div>
                        </div>
                        <div className="md:text-xl md:mt-[45px]">{user?.display_name}</div>
                        <div className="md:text-sm text-sm-dark-gray">@{user?.username}</div>
                    </div>
                </div>
            </div>
            <div>
                <div className="w-full flex justify-center md:py-4">Posts</div>
                <Virtuoso 
                    useWindowScroll
                    style={{height: '100%', margin: '1em 0'}}
                    data={posts} 
                    itemContent={(_, post: Post) =>{ return <Post key={post.id} post={post}/>}}
                    endReached={(_) => fetchNextPage()}
                />
            </div>
        </div>
    );
}
