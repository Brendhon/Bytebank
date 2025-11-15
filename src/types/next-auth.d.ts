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
   * Customized JWT interface with user identifier.
   * 
   * @interface JWT
   * @property {string} id - Unique identifier for the user stored in the JWT
   */
  interface JWT {
    id: string;
  }
}