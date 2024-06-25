import Image from "next/image"

interface Props {
    post: Post & Partial<User>,
}


export const Post = ({post}: Props) => {
    return (
        <div className="flex md:p-3 md:my-5 bg-sm-light-gray rounded-xl">
            <div className="h-full pr-2">
            <div className="h-[42px] w-[42px] relative">
                <Image className="rounded-full" src="/default_avatar.jpg" fill style={{objectFit: "cover"}} alt="Profile Picture" loading="lazy"></Image>
            </div>
            </div>
            <div className="text-[0.9em]">
                <div><span className="pr-1">{post.display_name}</span><span className="text-sm-dark-gray">@{post.username}</span></div>
                <span className="whitespace-pre-wrap">{post.text}</span>
            </div>
        </div>
    )
}
