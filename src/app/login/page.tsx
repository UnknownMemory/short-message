"use client"
// import { useFormState } from "react-dom"

import login from "./action"
import { FormInput } from "@/components/FormInput"
import { useFormState } from "react-dom"


export default function Login() {
    const [state, loginAction] = useFormState(login, null)
    return (
        <div className="h-screen w-full flex items-center justify-center">
            <form className="md:w-[35%] flex flex-col" action={loginAction}>
                <FormInput name="email" type="email" error={null}></FormInput>
                <FormInput name="password" type="password" error={null}></FormInput>
                <div className="flex justify-end">
                    <button className="btn-default" type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}
