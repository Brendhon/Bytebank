/**
 * Represents a user in the system.
 * 
 * @interface IUser
 * @property {string} [_id] - Optional unique identifier (MongoDB ObjectId)
 * @property {string} name - User's full name
 * @property {string} email - User's email address (must be unique)
 * @property {string} password - Hashed password (never store plain text)
 * @property {boolean} acceptPrivacy - Whether user accepted privacy policy
 * @property {Date} [createdAt] - Optional creation timestamp
 * @property {Date} [updatedAt] - Optional last update timestamp
 */
export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  acceptPrivacy: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}