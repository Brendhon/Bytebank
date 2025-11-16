import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

/**
 * Type declaration module augmentation for NextAuth.
 * Extends the "next-auth" module to customize the Session and User interfaces.
 * 
 * @module next-auth
 */
declare module "next-auth" {
  /**
   * Customized Session interface with user object containing specific properties.
   * 
   * @interface Session
   * @property {Object} user - User object with authentication information
   * @property {string} user.id - Unique identifier for the user
   * @property {string | null} [user.name] - Optional name of the user
   * @property {string | null} [user.email] - Optional email of the user
   * @property {string | null} [user.image] - Optional profile image URL of the user
   */
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  /**
   * Extended User interface that includes an id property.
   * 
   * @interface User
   * @extends {DefaultUser}
   * @property {string} id - Unique identifier for the user
   */
  interface User extends DefaultUser {
    id: string;
  }
}

/**
 * Type declaration module augmentation for NextAuth JWT.
 * Extends the "next-auth/jwt" module to customize the JWT interface.
 * 
 * @module next-auth/jwt
 */
declare module "next-auth/jwt" {
  /**
   * Customized JWT interface with user identifier and additional user information.
   * 
   * @interface JWT
   * @property {string} id - Unique identifier for the user stored in the JWT
   * @property {string} [email] - User's email address stored in the JWT
   * @property {string} [name] - User's name stored in the JWT
   */
  interface JWT {
    id: string;
    email?: string;
    name?: string;
  }
}

/**
 * Credentials type for NextAuth authorize function
 * 
 * @typedef {Object} Credentials
 * @property {string} [email] - User email address
 * @property {string} [password] - User password
 */
export type Credentials = {
  email?: string;
  password?: string;
};

/**
 * Type for JWT callback parameters
 * 
 * @typedef {Object} JWTCallbackParams
 * @property {JWT} token - JWT token object
 * @property {User} [user] - User object from authorize function (only present during initial login)
 */
export type JWTCallbackParams = {
  token: JWT;
  user?: import('next-auth').User;
};

/**
 * Type for Session callback parameters
 * 
 * @typedef {Object} SessionCallbackParams
 * @property {Session} session - Session object
 * @property {JWT} token - JWT token object
 */
export type SessionCallbackParams = {
  session: import('next-auth').Session;
  token: JWT;
};

/**
 * Type for User document from database
 * 
 * @typedef {Object} UserDocument
 * @property {Object} _id - MongoDB document ID with toString method
 * @property {string | null} [name] - User's name
 * @property {string | null} [email] - User's email address
 * @property {string} password - User's hashed password
 */
export type UserDocument = {
  _id: { toString: () => string };
  name?: string | null;
  email?: string | null;
  password: string;
};