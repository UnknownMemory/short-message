import { eq, getTableColumns } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

import { db } from "@/app/db/db"
import { user } from "@/app/db/schema/user"


export const getUserLogin = async (email: string, password: string) => {
    const res: User[] = await db.select().from(user).where(eq(user.email, email))

    if (res[0] && res[0].password) {
        const passwordsMatch = await bcrypt.compare(password, res[0].password);

        if (passwordsMatch) {
            delete res[0]['password'];
            return res[0];
        }
    }

    return null
}
