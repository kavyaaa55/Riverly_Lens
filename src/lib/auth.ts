import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import prisma from '@/db';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'you@example.com' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password are required');
                }

                try {
                    // Find user by email
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email.toLowerCase() },
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            passwordHash: true,
                            companyType: true,
                            userCompanyName: true,
                            weeklyEmailEnabled: true,
                        },
                    });

                    if (!user) {
                        throw new Error('Invalid email or password');
                    }

                    // Verify password
                    const isPasswordValid = await bcrypt.compare(
                        credentials.password,
                        user.passwordHash
                    );

                    if (!isPasswordValid) {
                        throw new Error('Invalid email or password');
                    }

                    // Return user object (without passwordHash)
                    return {
                        id: user.id,
                        email: user.email,
                        name: `${user.firstName} ${user.lastName}`,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        companyType: user.companyType,
                        userCompanyName: user.userCompanyName,
                    };
                } catch (error) {
                    console.error('Auth error:', error);
                    throw new Error('Invalid email or password');
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: '/login',
        signOut: '/login',
        error: '/login',
    },
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            // Initial sign in
            if (user) {
                token.id = user.id;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.companyType = user.companyType;
                token.userCompanyName = user.userCompanyName;
            }

            // Handle session updates
            if (trigger === 'update' && session) {
                token.firstName = session.firstName || token.firstName;
                token.lastName = session.lastName || token.lastName;
                token.companyType = session.companyType || token.companyType;
                token.userCompanyName = session.userCompanyName || token.userCompanyName;
            }

            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.firstName = token.firstName as string;
                session.user.lastName = token.lastName as string;
                session.user.name = `${token.firstName} ${token.lastName}`;
                session.user.companyType = token.companyType as string | null;
                session.user.userCompanyName = token.userCompanyName as string | null;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
};
