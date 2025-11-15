import User from '@/models/User/User';
import { PAGE_ROUTES } from '@/lib/constants/routes';
import bcrypt from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '../mongoose/mongoose';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Connect to the database
        await connectToDatabase();

        // Get the user data
        const user = await User.findOne({ email: credentials?.email });

        // If the user exists and the password is valid
        const passwordValid = await bcrypt.compare(credentials?.password || '', user?.password || '');

        // If the user exists and the password is valid
        return user && passwordValid ? { id: user._id, name: user.name, email: user.email } : null;
      },
    }),
  ],
  pages: {
    signIn: PAGE_ROUTES.HOME,
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,      // Expires in 24h
    updateAge: 60 * 60,        // Update session every hour
  },
  callbacks: {
    // 1) During the initial login, the user is populated → we assign the id to the token
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.email = (user as any).email;
        token.name = (user as any).name;
      }
      return token;
    },
    // 2) Whenever the session is built, we return the id from the token
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
