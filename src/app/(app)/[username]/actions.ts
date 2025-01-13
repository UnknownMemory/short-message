'use server'
import { cookies } from "next/headers"
import { sql } from 'drizzle-orm';
import { z } from "zod";

import { db } from "@/db/db"
import { authAction } from "@/utils/auth"
import { User, UserJWTPayload } from "@/types/User";


const schema = z.object({
    profileID: z.number()
})


async function action(loggedUser: UserJWTPayload, profileID: User["id"]) {
    const validatedFields = schema.safeParse({
        profileID: profileID
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors.profileID,
        }
    }

    const userID = loggedUser.id
    const created_at = Date.now() / 1000.0

    const statement = sql.raw(`
                DO $$
                BEGIN
                    IF EXISTS (SELECT * FROM follow WHERE follow.user_id = ${userID} AND follow.following_id = ${validatedFields.data.profileID}) THEN
                        DELETE FROM follow WHERE follow.user_id = ${userID} AND follow.following_id = ${validatedFields.data.profileID};
                    ELSE
                        INSERT INTO follow (user_id, following_id, created_at) VALUES (${userID}, ${validatedFields.data.profileID}, TO_TIMESTAMP(${created_at}));
                    END IF;
                END $$
            `)

    return await db.execute(statement)
}


export default async function followAction(profileID: User["id"]) {
    return authAction(cookies().get('accessToken'), action, profileID)
}
