import NextAuth from 'next-auth';
import Google from "next-auth/providers/google"
import Credentials from 'next-auth/providers/credentials'

import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { z } from 'zod'

import { authConfig } from '../../../auth.config';
import { getUserLogin } from '@/utils/user/getUserLogin';
import { db } from '@/app/db/db';
import { account } from '@/app/db/schema/account';
import { user } from '@/app/db/schema/user';


const MAX_AGE = 15 * 24 * 60 * 60

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: DrizzleAdapter(db, {
        usersTable: user,
        accountsTable: account,
    }),
    session: {
        strategy: 'jwt'
    },
    providers: [
        Google,
        // Credentials({
        //     authorize: async (credentials): Promise<any> => {
        //         const parsedCredentials = z.object({ email: z.string().email(), password: z.string().min(8) }).safeParse(credentials)

        //         if (parsedCredentials.success) {
        //             const user: User | null = await getUserLogin(parsedCredentials.data.email, parsedCredentials.data.password)

        //             if (user) {
        //                 return user;
        //             }
        //         }

        //         throw new Error("User not found.")
        //     }
        // })
    ],
    cookies: {
        pkceCodeVerifier: {
            name: "next-auth.pkce.code_verifier",
            options: {
                httpOnly: true,
                sameSite: "none",
                path: "/",
                secure: true,
            },
        },
    }
});
