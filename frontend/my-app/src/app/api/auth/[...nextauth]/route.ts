import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '189973885940-rricflbbru9tbp5if0dfm18bms46rt72.apps.googleusercontent.com',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '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'
        })
    ]
})

export { handler as GET, handler as POST }