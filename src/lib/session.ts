import NextAuth, { NextAuthOptions, User, Session, getServerSession } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

import GoogleProvider from 'next-auth/providers/google'
import { createUser, getUser } from "./action";

interface SessionInterface extends Session {
    user: User & {
        id: string;
        name: string;
        email: string;
        avatarUrl: string;
    };
}


export const authOptions: NextAuthOptions = {
    secret: 'my-secret',
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],

    theme: {
        colorScheme: 'light',
        logo: '/logo.svg'
    },
    // jwt:{
    //     decode:({secret,token})=>{

    //     },
    //     encode:async ({secret,token})=>{

    //     }


    // },
    callbacks: {
        async session({ session }) { // get triggred everytime a user visits the page


            return session

        },
        async signIn({ user }: { user: AdapterUser | User }) {
            try {
                // query and mutation
                const userExists = await getUser(user?.email as string)
                if (!userExists) {
                    await createUser(
                        user.name as string, 
                        user.email as string,
                        user.image as string)
                }
                return true
            } catch (error: any) {
                console.log('errou sigin', error)
                return false
            }
        }
    }
}

export async function getCurrentUser() {
    const session = await getServerSession(authOptions) as SessionInterface

    return session
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }