import { axiosPrivate } from "@/app/lib/axios";
import NextAuth, { NextAuthOptions } from "next-auth";

import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credential",
            credentials: {
                email: { input: "email", type: "email" },
                password: { input: "password", type: "password" },
            },
            async authorize(credentials: any) {
                const res = await axiosPrivate.post("/auth/login", {
                    email: credentials?.email,
                    password: credentials?.password,
                }, {
                    withCredentials: true,       
                });
                const user = res.data;
                if (user) {
                    return user
                } else {
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user, account }) {
            console.log({ account })

            return { ...token, ...user }
        },

        async session({ session, token, user }) {
            session.user = token as any

            return session
        }
    },
    pages: {

    }
}

// export default NextAuth(authOptions);
export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST, handler as PATCH, handler as DELETE }