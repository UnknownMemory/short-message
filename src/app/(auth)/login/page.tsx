"use server"
import {redirect} from "next/navigation";
import LoginPage from "@/app/(auth)/login/login";
import {apiCheckAuth} from "@/utils/auth";

export default async function Login() {
    if(await apiCheckAuth()){
        redirect("/")
    }

    return <LoginPage/>;
}
