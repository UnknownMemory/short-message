"use server"
import {redirect} from "next/navigation";
import SignUpPage from "@/app/(auth)/signup/signup";
import {apiCheckAuth} from "@/utils/auth";


export default async function Login() {
    if(await apiCheckAuth()){
        redirect("/")
    }

    return <SignUpPage/>;
}
