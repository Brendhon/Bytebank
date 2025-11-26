/**
 * Base user information containing core user data.
 * 
 * @interface IUserBase
 * @property {string} name - User's full name
 * @property {string} email - User's email address (must be unique)
 * @property {string} password - Hashed password (never store plain text)
 * @property {boolean} acceptPrivacy - Whether user accepted privacy policy
 */
export interface IUserBase {
  name: string;
  email: string;
  password: string;
  acceptPrivacy: boolean;
}

/**
 * User metadata containing database-related fields.
 * 
 * @interface IUserMetadata
 * @property {string} [_id] - Optional unique identifier (MongoDB ObjectId)
 * @property {Date} [createdAt] - Optional creation timestamp
 * @property {Date} [updatedAt] - Optional last update timestamp
 */
export interface IUserMetadata {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Represents a complete user in the system.
 * Combines base user information with metadata following Interface Segregation Principle.
 * 
 * @interface IUser
 * @extends {IUserBase}
 * @extends {IUserMetadata}
 */
export interface IUser extends IUserBase, IUserMetadata {}

/**
 * Data structure for updating a user via API.
 * Used when sending update requests to the server.
 * 
 * @interface IUserUpdateData
 * @property {string} [name] - Optional user's full name
 * @property {string} [email] - Optional user's email address
 * @property {string} [password] - New password (when updating password)
 * @property {string} [currentPassword] - Current password for validation (required when updating password)
 */
export interface IUserUpdateData {
  name?: string;
  email?: string;
  password?: string;
  currentPassword?: string;
}