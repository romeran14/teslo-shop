import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { dbUsers } from "@/database"
import { signIn } from 'next-auth/react';
import { SessionStrategy } from "next-auth";


export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        Credentials({
            name: 'Custom Login',
            credentials: {
                email: {
                    label: 'Correo', type: 'email', placeholder: 'correo@google.com'
                },
                password: {
                    label: 'Contrasena', type: 'password', placeholder: 'contrasena'
                },
            },
            async authorize(credentials) {
                console.log(credentials)
               const solve =  await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password)
               console.log(solve)
               return solve
            }

        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
        }),
        // ...add more providers here


    ],

    //Custom Pages
    pages:{    
        signIn:'/auth/login',
        newUser:'/auth/register',
    },

    //CallBacks

    jwt: {},

    
    //Config
    session:{
        maxAge:2592000,/// 30d
        strategy: "jwt" as SessionStrategy ,
        updateAge:86400,// cada dia

    },
    callbacks: {
        async jwt({ token, account, user }: any) {

            if (account) {
                token.accesToken = account.accesToken as any

                switch (account.type) {
                    case 'oauth':
                        token.user = await dbUsers.oAuthToDbUser(user?.email || '', user?.name || '');
                        break;

                    case 'credentials':
                        token.user = user
                        break;
                    default:
                        break;
                }
            }

            return token
        },
        async session({ session, token, user }: any) {
            session.accessToken = token.accessToken as any;
            session.user = token.user as any;
            return session;
        },
    },

}

export default NextAuth(authOptions)