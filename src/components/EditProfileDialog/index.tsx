"use client"

import Image from "next/image";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useQueryClient } from "@tanstack/react-query";

import { updateAcc } from "./actions";
import { Dialog } from "@/components/Dialog";
import { FormInput } from "../FormInput"

import { User } from "@/types/User"


interface EditDialogProps {
    user: User,
    isOpen: boolean;
    onClose?: () => void;
}

export const EditProfileDialog   = ({user, isOpen, onClose}: EditDialogProps) => {
    const queryClient = useQueryClient()
    const [state, updateAccAction] = useFormState(updateAcc, null);

    useEffect(() => {
        (async () => {
            if(state?.success){
                await queryClient.invalidateQueries({queryKey: ['profile', user.username]})
                await queryClient.invalidateQueries({queryKey: ['me']})
                onClose && onClose()
            }
        })()
    }, [state, onClose, queryClient, user.username])

    return (
        <Dialog isOpen={isOpen} onClose={onClose} customStyle={"top-1 md:w-[35%] w-[95%]"}>
            <Dialog.Header title={"Edit Profile"} onClose={onClose} formId={"edit-profile"}></Dialog.Header>
            <div className="relative">
                <div className="h-[150px] w-full">
                    <div className="w-full h-full bg-white"></div>
                </div>
                <div id="avatar" className="flex justify-center w-full absolute top-[107px] pointer-events-none">
                    <div className="h-[90px] w-[90px] relative">
                        <Image className="rounded-full" src="/default_avatar.jpg" fill style={{objectFit: "cover"}}
                               alt="Profile Picture" loading="lazy"></Image>
                    </div>
                </div>
            </div>
            <form id="edit-profile" action={updateAccAction} className="mt-12">
                <div className="px-4">
                    <label className="text-xs dark:text-sm-white">Display Name</label>
                    <FormInput name="display_name" defaultValue={user?.display_name} type="text" error={state?.errors?.display_name}/>
                </div>
                <div className="px-4">
                    <label className="text-xs dark:text-sm-white">Description</label>
                    <FormInput name="description" defaultValue={user?.description ? user?.description : undefined} type="text" error={state?.errors?.description}/>
                </div>
            </form>
        </Dialog>
    )
}
