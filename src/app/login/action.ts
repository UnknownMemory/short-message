'use server'

import { AuthError } from 'next-auth';
import { signIn } from "@/lib/auth/auth";
import { revalidatePath } from 'next/cache';


export default async function login(prevState: any, formData: FormData) {
    try {
        await signIn('credentials', formData);
        revalidatePath('/login')
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
    }
}
