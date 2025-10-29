import { Virtuoso } from "react-virtuoso";

import { Post } from "@/components/Post";
import { Post as PostT } from "@/types/Post";
import { InfiniteData } from "@tanstack/react-query";

interface UserTimelineProps {
    dataPages: InfiniteData<any, unknown> | undefined;
    fetchNextPage: Function;
    hasNextPage: boolean;
    isFetching: boolean;
    refetch: Function;
    id: number;
}

export const UserTimeline = ({ dataPages, fetchNextPage, hasNextPage, isFetching, refetch, id }: UserTimelineProps) => {
    const posts = dataPages?.pages.flatMap((page) => {
        return page.posts;
    });
    return (
        <>
            <Virtuoso
                useWindowScroll
                style={{ height: "100%", borderTopWidth: "1px" }}
                data={posts}
                itemContent={(_, post: PostT) => {
                    return <Post key={post.id} post={post} isTimeline={true} currentUserId={id} onDelete={refetch} />;
                }}
                endReached={(_) => hasNextPage && !isFetching && fetchNextPage()}
            />
        </>
    );
};
