"use client";
import { useFormState } from "react-dom";
import Image from "next/image";
import Link from "next/link";

import login from "./actions";
import { FormInput } from "@/components/FormInput";

export default function LoginPage() {
    const [state, loginAction] = useFormState(login, null);

    return (
        <div className="h-dvh w-full flex flex-col items-center justify-center">
            <div className="mb-9">
                <Image src="/logo.svg" alt="Short Message logo" width={108} height={108} />
            </div>
            {state?.errors?.request && <p className="md:text-sm text-red-600">{state.errors.request}</p>}
            <form className="w-[90%] md:w-[35%] flex flex-col" action={loginAction}>
                <FormInput name="email" type="email" error={state?.errors?.email}></FormInput>
                <FormInput name="password" type="password" error={state?.errors?.password}></FormInput>
                <div className="flex justify-between">
                    <Link prefetch={false} className="pt-2 inline" href="/signup">
                        {"Don't have an account?"}
                    </Link>
                    <button className="btn-light" type="submit">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}
