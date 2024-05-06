"use client"

import { useFormState } from "react-dom"
import signUp from "./actions"
   

export default function SignUp() {
    const [state, signUpAction] = useFormState(signUp, null)

    return (
        <div className="h-screen w-full flex items-center justify-center">
            <form className="md:w-[35%] flex flex-col" action={signUpAction}>
                <input className="md:mb-4 text-black" type="email" name="email" placeholder="email"/>
                <input className="md:mb-4 text-black" type="text" name="username" placeholder="username" />
                <input className="md:mb-4 text-black" type="password" name="password" placeholder="password" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
