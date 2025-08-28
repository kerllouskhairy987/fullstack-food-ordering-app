import { Environments } from "@/constants/enums";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/prisma";
import { login } from "./_actions/auth";
import { Locale } from "@/i18n.config";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60, // 7 days => == refresh token [when expire you need to login again]
        updateAge: 24 * 60 * 60 // 24 hours ==> == access token
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === Environments.DEV,  // عشان لو في اي debug م تظهرش في ال protections
    providers: [Credentials({
        name: "credentials",
        credentials: {
            email: {
                label: "Email",
                type: "email",
                placeholder: "Email"
            },
            password: {
                label: "Password",
                type: "password",
                placeholder: "Password"
            },
        },
        authorize: async (credentials, req) => {
            const currentUrl = req?.headers?.referer;
            const locale = currentUrl?.split("/")[3] as Locale;
            const res = await login(credentials,locale)
            
            if(res.status === 200 && res.user) {
                return res.user
            } else {
                throw new Error(JSON.stringify({
                    validationError: res.error,
                    responseError: res.message
                }))
            }
        }
    })],
    adapter: PrismaAdapter(db),
}