"use client"

import { useFormState } from "react-dom"

import signUp from "./actions"
import { FormInput } from "@/components/FormInput"
   

export default function SignUp() {
    const [state, signUpAction] = useFormState(signUp, null)

    return (
        <div className="h-screen w-full flex items-center justify-center">
            <form className="md:w-[35%] flex flex-col" action={signUpAction}>
                <FormInput name="email" type="email" error={state?.errors.email}></FormInput>
                <FormInput name="username" type="text" error={state?.errors.username}></FormInput>
                <FormInput name="password" type="password" error={state?.errors.password}></FormInput>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
