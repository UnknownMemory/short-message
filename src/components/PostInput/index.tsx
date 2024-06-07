'use client'
import Image from "next/image"
import { useRef } from "react"
import savePost from "./action"


export const PostInput = () => {

    const editableRef = useRef<HTMLElement>(null)

    return (
        <div className="flex flex-col md:p-3 md:my-5 bg-sm-light-gray rounded-xl">
            <div className="flex h-full pr-2">
                <div className="h-[42px] w-[42px] relative">
                    <Image className="rounded-full" src="/default_avatar.jpg" fill style={{objectFit: "cover"}} alt="Profile Picture" loading="lazy"></Image>
                </div>
                <span className="post-input h-42px" ref={editableRef} contentEditable role="textbox" placeholder="What's on your mind..."></span>
            </div>
            <div className="w-full ">
                <button className="btn-light float-right" onClick={async () => {

                    if (editableRef.current) {
                        await savePost(1, editableRef.current.innerText)
                        editableRef.current.innerText = ''
                    }

                }}>Post</button>
            </div>

        </div>
    )
}
