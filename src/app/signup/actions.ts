'use server'

import { z } from "zod"
import { db } from "@/app/db/db"
import { user } from "@/app/db/schema/user"
import { revalidatePath } from "next/cache"
import { hash } from "bcryptjs"


const schema = z.object({
    email: z.string({ invalid_type_error: 'Invalid Email' }).max(254),
    username: z.string({ invalid_type_error: 'Invalid Username' }).max(48),
    password: z.string()
})

export default async function signUp(prevState: any, formData: FormData) {
    const validatedFields = schema.safeParse({
        email: formData.get('email'),
        username: formData.get('username'),
        password: formData.get('password')
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const hashedPassword = await hash(validatedFields.data.password, 12)

    await db.insert(user).values({
        email: validatedFields.data.email,
        username: validatedFields.data.username,
        display_name: validatedFields.data.username,
        avatar: '',
        password: hashedPassword,
    })

    revalidatePath('/signup')
}
