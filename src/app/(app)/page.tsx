"use client"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Virtuoso } from 'react-virtuoso'

import { Post } from "@/components/Post";
import { PostInput } from "@/components/PostInput";
import { getCurrentUser, getTimeline } from "@/utils/service";
import { useEffect } from "react";


export default function Home() {
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


    // useEffect(() => {
    //     const eventSrc = new EventSource(`${process.env.NEXT_PUBLIC_HOST}/api/post/timeline/update`, {withCredentials: true})

    //     eventSrc.onmessage = (event) => {
    //         if(event.data){
    //             console.log(event.data)
    //         }
    //     }

    //     return () => {
    //         eventSrc.close();
    //       };    
    // }, [])

    return (
        <>
            <div id="feed" className="min-h-full border-x-[1px]">
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
