import Image from "next/image"

interface Props {
    user: User,
    post: string,
}


export const Post = ({user, post}: Props) => {
    return(
    <div className="flex p-3">
        <div className="h-full md:w-40">
            <Image className="rounded-full" src="/default_avatar.jpg" width="42" height="42" alt="Profile Picture"></Image>
        </div>
        <div className="text-[0.9em]">
            <div><span className="pr-1">User</span><span className="text-sm-dark-gray">@user</span></div>
            <span className="whitespace-pre-wrap">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro numquam repudiandae qui ab ut quis provident aliquam! Blanditiis voluptatibus fugit ad quisquam accusantium nisi, sed ipsam voluptatum ea temporibus quis.</span>
        </div>
    </div>
    )
}
