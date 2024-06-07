import Image from "next/image"

interface Props {
    user: User,
    post: string,
}


export const Post = ({user, post}: Props) => {
    return (
        <div className="flex md:p-3 md:my-5 bg-sm-light-gray rounded-xl">
            <div className="h-full pr-2">
            <div className="h-[42px] w-[42px] relative">
                <Image className="rounded-full" src="/default_avatar.jpg" fill style={{objectFit: "cover"}} alt="Profile Picture" loading="lazy"></Image>
            </div>
            </div>
            <div className="text-[0.9em]">
                <div><span className="pr-1">User</span><span className="text-sm-dark-gray">@user</span></div>
                <span className="whitespace-pre-wrap">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro numquam repudiandae qui ab ut quis provident aliquam! Blanditiis voluptatibus fugit ad quisquam accusantium nisi, sed ipsam voluptatum ea temporibus quis.</span>
            </div>
        </div>
    )
}
