import { TrashIcon } from "@heroicons/react/16/solid"
import { deletePostAction } from "./actions"


interface Props {
    postId: number,
    closeTooltip: Function
}

export const PostTooltip = ({postId, closeTooltip}: Props) => {
    const deletePost = async (postId: number) => {
        const deletedPost = await deletePostAction(postId)
        if(!deletedPost.hasOwnProperty('errors')){
            closeTooltip()
        }
    }
    return (
        <div className="absolute right-0 top-6 p-2 min-w-max bg-black border-sm-border-dark border-[0.2px] rounded-md" onClick={(e) => {e.stopPropagation(); deletePost(postId)}}>
            <div className="flex justify-center items-center w-full text-red-600">
                <TrashIcon width={20} height={20}/>Delete post
            </div>
        </div>
    )
}
