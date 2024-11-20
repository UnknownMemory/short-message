'use server'
import { cookies } from "next/headers"
import { sql } from 'drizzle-orm';
import { z } from "zod";

import { db } from "@/db/db"
import { checkJWT } from "@/utils/auth"
import { User } from "@/types/User";


const schema = z.object({
    profileID: z.number()
})

export default async function followAction(profileID: User["id"]) {
    const accessToken = cookies().get('accessToken')
    if (accessToken) {
        const user = await checkJWT(accessToken.value)

        if (user) {
            const validatedFields = schema.safeParse({
                profileID: profileID
            })

            if (!validatedFields.success) {
                return {
                    errors: validatedFields.error.flatten().fieldErrors.profileID,
                }
            }

            const userID = user.id
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
    }

    return { 'errors': 'You must be authenticated to perform this action.' }
}
