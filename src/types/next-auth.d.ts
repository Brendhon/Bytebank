import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

// Extending the "next-auth" module to customize the Session and User interfaces
declare module "next-auth" {
  // Customizing the Session interface to include a user object with specific properties
  interface Session {
    user: {
      id: string; // Unique identifier for the user
      name?: string | null; // Optional name of the user
      email?: string | null; // Optional email of the user
      image?: string | null; // Optional profile image of the user
    };
  }

  // Extending the DefaultUser interface to include an id property
  interface User extends DefaultUser {
    id: string; // Unique identifier for the user
  }
}

// Extending the "next-auth/jwt" module to customize the JWT interface
declare module "next-auth/jwt" {
  interface JWT {
    id: string; // Unique identifier for the user stored in the JWT
  }
}