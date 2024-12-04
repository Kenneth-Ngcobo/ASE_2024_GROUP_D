import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from "bcryptjs";
import connectToDatabase from "./db";

/**
 * Handles NextAuth authentication configuration.
 * Supports both credentials-based and Google OAuth authentication.
 */
export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            /**
             * Authorizes user using email and password credentials.
             * @param {Object} credentials - The user credentials.
             * @param {string} credentials.email - The email address of the user.
             * @param {string} credentials.password - The password of the user.
             * @returns {Object|null} The authorized user object or null if unauthorized.
             */
            async authorize(credentials) {
                const db = await connectToDatabase();
                const user = await db.collection("users").findOne({ email: credentials.email });

                if (user && await bcrypt.compare(credentials.password, user.password)) {
                    return { id: user._id, email: user.email };
                }
                return null;
            },
        }),
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
    secret: process.env.AUTH_SECRET,
    session: { strategy: "jwt" },
    callbacks: {
        /**
         * Adds custom fields to the JWT token.
         * @param {Object} token - The current JWT token.
         * @param {Object} user - The authenticated user (if any).
         * @returns {Object} The updated token.
         */
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        /**
         * Modifies session data by adding user details.
         * @param {Object} session - The session object.
         * @param {Object} token - The JWT token.
         * @returns {Object} The updated session object.
         */
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.email = token.email;
            return session;
        },

        /**
         * Automatically adds new Google users to the database.
         * @param {Object} user - The authenticated user.
         * @param {Object} account - The authentication account.
         * @returns {boolean} Whether the sign-in is allowed.
         */
        async signIn({ user, account }) {
            if (account.provider === "google") {
                const db = await connectToDatabase();

                // Check if the user exists in the database
                const existingUser = await db.collection("users").findOne({ email: user.email });

                if (!existingUser) {
                    // Add new Google-authenticated user to the database
                    await db.collection("users").insertOne({
                        email: user.email,
                        name: user.name,
                        image: user.image,  // Store profile image if needed
                        createdAt: new Date(),
                    });
                }
            }
            return true;
        },
    },
});




