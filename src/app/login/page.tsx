"use server"
// import { useFormState } from "react-dom"

// import login from "./action"
// import { FormInput } from "@/components/FormInput"
// import { useSession } from "next-auth/react"
import { signIn } from "@/lib/auth/auth"


export default async function Login() {
    return (
        <div className="h-screen w-full flex items-center justify-center">
            <form className="md:w-[35%] flex flex-col" action={loginAction}>
                <FormInput name="email" type="email"  error={false}></FormInput>
                <FormInput name="password" type="password" error={false}></FormInput>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
