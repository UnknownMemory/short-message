"use client"

import { useFormState } from "react-dom"
import signUp from "./actions"
   

export default function SignUp() {
    const [state, signUpAction] = useFormState(signUp, null)

    return (
        <div className="h-screen w-full flex items-center justify-center">
            <form className="md:w-[35%] flex flex-col" action={signUpAction}>
                <div className="w-full">
                    <p className="md:text-sm text-red-600">{state?.errors.email}</p>
                    <input className="md:mb-4 text-black w-full" type="email" name="email" placeholder="email"/>
                </div>
                <div className="w-full">
                    <p className="md:text-sm text-red-600">{state?.errors.username}</p>
                    <input className="md:mb-4 text-black w-full" type="text" name="username" placeholder="username" />
                </div>
                <div className="w-full">
                    <p className="md:text-sm text-red-600">{state?.errors.password}</p>
                    <input className="md:mb-4 text-black w-full" type="password" name="password" placeholder="password" />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
