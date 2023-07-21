import NextAuth, { NextAuthOptions, User, Session, getServerSession } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

import GoogleProvider from 'next-auth/providers/google'
import { createUser, getUser } from "./action";
import jsonwebtoken from 'jsonwebtoken'
import { JWT } from "next-auth/jwt";
interface ProjectInterface {
    title: string;
    description: string;
    image: string;
    liveSiteUrl: string;
    githubUrl: string;
    category: string;
    id: string;
    createdBy: {
        name: string;
        email: string;
        avatarUrl: string;
        id: string;
    };
}

interface SessionInterface extends Session {
    user: User & {
        id: string;
        name: string;
        email: string;
        avatarUrl: string;
    };
}
interface UserProfile {
    id: string;
    name: string;
    email: string;
    description: string | null;
    avatarUrl: string;
    githubUrl: string | null;
    linkedinUrl: string | null;
    projects: {
        edges: { node: ProjectInterface }[];
        pageInfo: {
            hasPreviousPage: boolean;
            hasNextPage: boolean;
            startCursor: string;
            endCursor: string;
        };
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
    jwt: {

        encode: async ({ secret, token }) => {
            const encodedToken = jsonwebtoken.sign({
                ...token,
                iss: 'grafbase',
                exp: Math.floor(Date.now() / 1000) + 60 * 60
            }, secret)
            return encodedToken
        },

        decode: ({ secret, token }) => {
            const decodedToken = jsonwebtoken.verify(token!,secret) as JWT
            return decodedToken

        }

    },
    // },
    callbacks: {
        async session({ session }) { // get triggred everytime a user visits the page
            const email = session.user?.email as string
            try {
                const data = await getUser(email) as { user: UserProfile }
                const newSession = {
                    ...session,
                    user: {
                        ...session.user,
                        ...data.user
                    }
                }
                return newSession
            } catch (e) {
                console.log('session error: ', e)
                return session
            }



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