import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectToDatabase from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const db = await connectToDatabase();
                const user = await db.collection("users").findOne({ email: credentials.email });

                if (user && (await bcrypt.compare(credentials.password, user.password))) {
                    return { id: user._id, email: user.email };
                }
                return null;
            },
        }),
    ],
    secret: process.env.AUTH_SECRET,
    session: { strategy: "jwt" },
});