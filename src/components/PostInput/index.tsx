'use client'
import Image from "next/image"
import { FormEvent, useRef, useState } from "react"
import savePost from "./actions"


interface Props {
    userId: number,
    refetch: Function
}

export const PostInput = ({userId, refetch}: Props) => {
    const editableRef = useRef<HTMLElement>(null)
    const [editable, setEditable] = useState('')

    const onInput = (e: FormEvent<HTMLSpanElement>) => {
        setEditable(e.currentTarget.innerText)
    }
    return (
        <div className="flex flex-col md:p-3 md:my-5 bg-sm-light-gray rounded-xl">
            <div className="flex h-full pr-2">
                <div className="h-[42px] w-[42px] relative">
                    <Image className="rounded-full" src="/default_avatar.jpg" fill style={{objectFit: "cover"}} alt="Profile Picture" loading="lazy"></Image>
                </div>
                <span className="post-input h-42px" ref={editableRef} contentEditable role="textbox" data-placeholder="What's on your mind..." onInput={onInput}></span>
            </div>
            <div className="w-full ">
                <button className="btn-light float-right" onClick={async () => {

                    if (editable !== '' && editableRef.current) {
                        await savePost(new Date(), editable)
                        setEditable('')
                        editableRef.current.innerText = ''
                        refetch()
                    }

                }} disabled={editable !== '' ? false : true}>Post</button>
            </div>

        </div>
    )
}
