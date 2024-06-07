'use client'
import Image from "next/image"


export const PostInput = () => {
    return (
        <div className="flex flex-col md:p-3 md:my-5 bg-sm-light-gray rounded-xl">
            <div className="flex h-full pr-2">
                <div className="h-[42px] w-[42px] relative">
                    <Image className="rounded-full" src="/default_avatar.jpg" fill style={{objectFit: "cover"}} alt="Profile Picture" loading="lazy"></Image>
                </div>
                <span className="post-input h-42px" contentEditable role="textbox"></span>
            </div>
            <div className="w-full ">
                <button className="btn-light float-right" type="submit">Post</button>
            </div>

        </div>
    )
}
