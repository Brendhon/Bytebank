import { PAGE_ROUTES } from '@/lib/constants';
import User from '@/models/User/User';
import bcrypt from 'bcryptjs';
import { NextAuthOptions, Session, User as NextAuthUser, getServerSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { Credentials, JWTCallbackParams, SessionCallbackParams, UserDocument } from '@/types/next-auth';
import { connectToDatabase } from '../mongoose/mongoose';

/**
 * Validates if credentials are provided and not empty
 * @param {Credentials | undefined} credentials - User credentials to validate
 * @returns {boolean} True if credentials are valid, false otherwise
 */
const validateCredentials = (credentials: Credentials | undefined): boolean => {
  return !!(credentials?.email && credentials?.password);
};

/**
 * Fetches user from database by email
 * @param {string} email - User email address
 * @returns {Promise<UserDocument | null>} User document or null if not found
 */
const findUserByEmail = async (email: string): Promise<UserDocument | null> => {
  await connectToDatabase();
  const user = await User.findOne({ email });
  return user as UserDocument | null;
};

/**
 * Performs dummy password comparison to prevent timing attacks
 * This ensures consistent response time regardless of user existence
 */
const performDummyHashComparison = async (): Promise<void> => {
  await bcrypt.compare('dummy', '$2a$10$dummy');
};

/**
 * Compares provided password with user's hashed password
 * @param {string} providedPassword - Password provided by user
 * @param {string} hashedPassword - Hashed password from database
 * @returns {Promise<boolean>} True if passwords match, false otherwise
 */
const comparePassword = async (providedPassword: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(providedPassword, hashedPassword);
};

/**
 * Transforms database user to NextAuth user format
 * @param {UserDocument} user - User document from database
 * @returns {NextAuthUser} NextAuth user object
 */
const transformUserToNextAuth = (user: UserDocument): NextAuthUser => {
  return {
    id: user._id.toString(),
    name: user.name ?? undefined,
    email: user.email ?? undefined,
  };
};

/**
 * Authorizes user credentials against the database
 * @param {Credentials | undefined} credentials - User credentials (email and password)
 * @returns {Promise<NextAuthUser | null>} User object if credentials are valid, null otherwise
 */
const authorizeUser = async (credentials: Credentials | undefined): Promise<NextAuthUser | null> => {
  try {
    // Validate credentials
    if (!validateCredentials(credentials)) {
      return null;
    }

    // Get the user data
    const user = await findUserByEmail(credentials!.email!);

    // If user doesn't exist, perform dummy hash comparison to prevent timing attacks
    if (!user) {
      await performDummyHashComparison();
      return null;
    }

    // Compare password
    const passwordValid = await comparePassword(credentials!.password!, user.password);

    // Return user if password is valid
    return passwordValid ? transformUserToNextAuth(user) : null;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
};

/**
 * Populates JWT token with user information during initial login
 * @param {JWTCallbackParams} params - JWT callback parameters
 * @returns {Promise<JWT>} Updated JWT token
 */
const populateJWTToken = async ({ token, user }: JWTCallbackParams): Promise<JWT> => {
  if (user) {
    token.id = user.id;
    token.email = user.email ?? undefined;
    token.name = user.name ?? undefined;
  }
  return token;
};

/**
 * Populates session with user information from token
 * @param {SessionCallbackParams} params - Session callback parameters
 * @returns {Promise<Session>} Updated session object
 */
const populateSession = async ({ session, token }: SessionCallbackParams): Promise<Session> => {
  if (session.user) {
    session.user.id = token.id;
    session.user.email = token.email ?? null;
    session.user.name = token.name ?? null;
  }
  return session;
};

/**
 * NextAuth configuration options for authentication
 * Uses Credentials Provider with JWT session strategy
 * 
 * @constant {NextAuthOptions} authOptions
 * @description Configures NextAuth.js with credentials-based authentication, JWT sessions,
 * and custom callbacks to populate user information in tokens and sessions.
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: authorizeUser,
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
    jwt: populateJWTToken,
    session: populateSession,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

/**
 * Helper function to get the current session in API routes
 * @returns {Promise<Session | null>} The current session or null if not authenticated
 */
export const auth = (): Promise<Session | null> => getServerSession(authOptions);
