import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import { connectToDatabase } from './mongoose';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

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
    signIn: '/home',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
