"use client"
import {useState} from "react";
import Image from "next/image"
import { useParams } from 'next/navigation'
import { Virtuoso } from 'react-virtuoso';
import { useQueryClient } from "@tanstack/react-query";

import { Post } from '@/components/Post';
import { EditProfileDialog } from "@/components/EditProfileDialog";
import { Post as PostT } from "@/types/Post";
import followAction from './actions';

import { useCurrentUserQuery, useUserProfileQuery } from "@/queries/user";
import { useUserTimelineQuery } from "@/queries/post";



export default function Profile() {
    const [isOpen, setIsOpen] = useState(false);
    const params = useParams()
    const qClient = useQueryClient()

    const {data: me} = useCurrentUserQuery()

    const {data: user} = useUserProfileQuery(params.username)
    const userId = user?.id
 
    const {data: postsPages, fetchNextPage, refetch} = useUserTimelineQuery(params.username, userId)

    const posts = postsPages?.pages.flatMap(page => {
        return page.posts
    })

    const profileButton = () => {
        if(me?.username == params.username){
            return <button className="btn-light-outline" onClick={() => setIsOpen(true)}>Edit Profile</button>
        } else {
            if (user?.is_following) {
                return <button onClick={() => followAction(user.id).then(() => qClient.setQueryData(['profile', params.username], {...user, "is_following": false}))} className="btn-light-outline">Following</button>
            } else {
                return <button onClick={() => followAction(user.id).then(() => qClient.setQueryData(['profile', params.username], {...user, "is_following": true}))} className="btn-light">Follow</button>
            }
        }
    }

    return (
        <>
            <div id="profile" className="min-h-full md:border-x-[1px]">

                <div className="relative">
                    <div className="h-[150px] w-full">
                        <div className="w-full h-full bg-white"></div>
                    </div>
                    <div id="avatar" className="flex justify-center w-full absolute top-[107px] pointer-events-none">
                        <div className="h-[90px] w-[90px] relative">
                            <Image className="rounded-full" src="/default_avatar.jpg" fill style={{objectFit: "cover"}}
                                   alt="Profile Picture" loading="lazy"></Image>
                        </div>
                    </div>
                    <div className="w-100 p-2 flex justify-end">
                        {profileButton()}
                    </div>
                    <div>
                        <div className="flex flex-col items-center">
                            <div className="md:text-xl">{user?.display_name}</div>
                            <div className="md:text-sm text-sm-dark-gray">@{user?.username}</div>
                            <div className="md:text-sm flex justify-center mt-1">
                                <div className="mr-2">{user?.following} <span
                                    className="text-sm-dark-gray">followings</span></div>
                                <div>{user?.follower} <span className="text-sm-dark-gray">followers</span></div>
                            </div>
                            <div className="text-sm mt-2">{user?.description}</div>
                        </div>

                    </div>
                </div>
                <div>
                    <div className="w-full flex justify-center md:py-4">Posts</div>
                    <Virtuoso
                        useWindowScroll
                        style={{height: '100%', borderTopWidth: '1px'}}
                        data={posts}
                        itemContent={(_, post: PostT) => {
                            return <Post key={post.id} post={post} isTimeline={true} currentUserId={me?.id}
                                         onDelete={refetch}/>
                        }}
                        endReached={(_) => fetchNextPage()}
                    />
                </div>
            </div>
            {isOpen && <EditProfileDialog user={me} isOpen={isOpen} onClose={() => setIsOpen(false)} />}
        </>
    );
}
