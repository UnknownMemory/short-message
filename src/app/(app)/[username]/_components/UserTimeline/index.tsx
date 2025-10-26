import { Virtuoso } from "react-virtuoso";

import { Post } from "@/components/Post";
import { Post as PostT } from "@/types/Post";

interface UserTimelinegProps {
    dataPages: any;
    fetchNextPage: any;
    refetch: any;
    id: number;
}

export const UserTimeline = ({ dataPages, fetchNextPage, refetch, id }: UserTimelinegProps) => {
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
                endReached={(_) => fetchNextPage()}
            />
        </>
    );
};
