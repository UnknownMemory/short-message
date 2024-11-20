'use client'
import Image from "next/image"
import { FormEvent, useRef, useState } from "react"
import savePost from "./actions"


interface Props {
    refetch: Function
}

export const PostInput = ({refetch}: Props) => {
    const editableRef = useRef<HTMLElement>(null)
    const [editable, setEditable] = useState('')


    const onInput = (e: FormEvent<HTMLSpanElement>) => {
        setEditable(e.currentTarget.innerText)
    }

    const isLimit = editable.length > 0 && editable.length < 150

    return (
        <div className="flex flex-col p-3 border-b-[1px]">
            <div className="flex h-full pr-2">
                <div className="h-[42px] w-[42px] relative">
                    <Image className="rounded-full" src="/default_avatar.jpg" fill style={{objectFit: "cover"}} alt="Profile Picture" loading="lazy"></Image>
                </div>
                <span className="post-input min-h-[42px] max-h-[175px] break-words block overflow-scroll overflow-x-hidden overflow-y-auto" ref={editableRef} contentEditable="plaintext-only" role="textbox" data-placeholder="What's on your mind..." onInput={onInput}></span>
            </div>
            <div className="w-full flex justify-end items-center">
                <div className="pr-2 text-sm">{editable.length}</div>
                <button className="btn-light float-right" onClick={async () => {
                    if (editable !== '' && editableRef.current) {
                        await savePost(new Date(), editable)
                        setEditable('')
                        editableRef.current.innerText = ''
                        refetch()
                    }
                }} disabled={isLimit ? false : true}>Post</button>
            </div>

        </div>
    )
}
