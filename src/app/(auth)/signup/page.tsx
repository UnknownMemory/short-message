"use client";

import { useFormState } from "react-dom";
import Image from 'next/image';
import Link from "next/link";

import signUp from "./actions";
import { FormInput } from "@/components/FormInput";

export default function SignUp() {
  const [state, signUpAction] = useFormState(signUp, null);

  return (
    <div className="h-dvh w-full flex flex-col items-center justify-center">
      <div className="mb-9">
        <Image src="/logo.svg" alt="Short Message logo" width={108} height={108}/>
      </div>
      <form className="w-[90%] md:w-[35%] flex flex-col" action={signUpAction}>
        <FormInput name="email" type="email" error={state?.errors.email}></FormInput>
        <FormInput name="username" type="text" error={state?.errors.username}></FormInput>
        <FormInput name="password" type="password" error={state?.errors.password}></FormInput>
        <button className="btn-light" type="submit">
          Sign Up
        </button>
      </form>
      <Link prefetch={false} className="pt-2 inline" href="/login">
        Already have an account?
      </Link>
    </div>
  );
}
