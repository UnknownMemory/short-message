import NextAuth from 'next-auth';
import { encode, decode } from 'next-auth/jwt';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'

import { authConfig } from '../../../auth.config';
import { getUserLogin } from '@/utils/user/getUserLogin';
import { db } from '@/app/db/db';



export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: DrizzleAdapter(db),
    session: {
        strategy: 'jwt',
    },
    jwt: { encode, decode },
    providers: [

        Credentials({
            authorize: async (credentials): Promise<any> => {
                const parsedCredentials = z.object({ email: z.string().email(), password: z.string().min(8) }).safeParse(credentials)

                if (parsedCredentials.success) {
                    const user: User | null = await getUserLogin(parsedCredentials.data.email, parsedCredentials.data.password)

                    if (user) {
                        console.log(user)
                        return user;
                    }
                }

                throw new Error("User not found.")
            }
        })
    ]
}); 
