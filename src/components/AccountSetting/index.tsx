'use client'
import { useFormState } from "react-dom";

import { FormInput } from "../FormInput"

import { User } from "@/types/User"
import { updateAcc } from "./actions";


export const AccountSetting = ({user}: {user: User}) => {
    const [state, updateAccAction] = useFormState(updateAcc, null);

    return (
        <form action={updateAccAction}>
            <div>
                <label className="text-xs">Display Name</label>
                <FormInput name="display_name" defaultValue={user?.display_name} type="text" error={state?.errors?.display_name}/>
            </div>
            <div>
                <label className="text-xs">Description</label>
                <FormInput name="description" defaultValue={user?.description ? user?.description : undefined} type="text" error={state?.errors?.description}/>
            </div>

            <button className="btn-light" type="submit">Save Changes</button>
        </form>
    )
}
