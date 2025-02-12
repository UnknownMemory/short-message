"use client"
import { useFormState } from "react-dom"
import Link from "next/link"

import login from "./actions"
import { FormInput } from "@/components/FormInput"




export default function Login() {
    const [state, loginAction] = useFormState(login, null)
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center">
            <div className="mb-9 text-3xl font-bold text-sm-primary">Short Message</div>
            <form className="w-[90%] md:w-[35%] flex flex-col" action={loginAction}>
                <FormInput name="email" type="email" error={undefined}></FormInput>
                <FormInput name="password" type="password" error={undefined}></FormInput>
                <div className="flex justify-between">
                    <Link prefetch={false} className="pt-2 inline" href="/signup">{"Don\'t have an account?"}</Link>
                    <button className="btn-light" type="submit">Login</button>
                </div>
            </form>

        </div>
    )
}
