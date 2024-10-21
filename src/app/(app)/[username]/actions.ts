'use server'
import { cookies } from "next/headers"
import { sql } from 'drizzle-orm';

import { db } from "@/db/db"
import { checkJWT } from "@/utils/auth"


export default async function followAction() {

    const accessToken = cookies().get('accessToken')
    if (accessToken) {
        const user = await checkJWT(accessToken.value)

        if (user) {

            const userID = user.id
            const created_at = Date.now() / 1000.0

            const statement = sql.raw(`
                DO $$
                BEGIN
                    IF EXISTS (SELECT * FROM follow WHERE follow.user_id = ${userID} AND follow.following_id = 2) THEN
                        DELETE FROM follow WHERE follow.user_id = ${userID} AND follow.following_id = 2;
                    ELSE
                        INSERT INTO follow (user_id, following_id, created_at) VALUES (${userID}, 2, TO_TIMESTAMP(${created_at}));
                    END IF;
                END $$
            `)

            return await db.execute(statement)
        }
    }

    return { 'errors': 'You must be authenticated to perform this action.' }
}
