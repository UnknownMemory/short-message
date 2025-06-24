"use client"
import { useFormState } from "react-dom";

import { Dialog } from "@/components/Dialog";
import { FormInput } from "../FormInput"

import { User } from "@/types/User"
import { updateAcc } from "./actions";
import Image from "next/image";


interface EditDialogProps {
    user: User,
    isOpen: boolean;
    onClose?: () => void;
}

export const EditProfileDialog   = ({user, isOpen, onClose}: EditDialogProps) => {
    const [state, updateAccAction] = useFormState(updateAcc, null);

    return (
        <Dialog isOpen={isOpen} onClose={onClose} width={"w-[35%]"}>
            <Dialog.Header title={"Edit Profile"}></Dialog.Header>
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
            <form action={updateAccAction} className="mt-12">
                <div className="px-4">
                    <label className="text-xs dark:text-sm-white">Display Name</label>
                    <FormInput name="display_name" defaultValue={user?.display_name} type="text" error={state?.errors?.display_name}/>
                </div>
                <div className="px-4">
                    <label className="text-xs dark:text-sm-white">Description</label>
                    <FormInput name="description" defaultValue={user?.description ? user?.description : undefined} type="text" error={state?.errors?.description}/>
                </div>

                {/*<button className="btn-light" type="submit">Save Changes</button>*/}
            </form>
        </Dialog>
    )
}
