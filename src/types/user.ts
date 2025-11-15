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

/**
 * Custom error class for user not found scenarios.
 * 
 * @class UserNotFoundError
 * @extends {Error}
 * @property {number} status - HTTP status code (404)
 */
export class UserNotFoundError extends Error {
  public readonly status: number = 404;

  constructor(email: string) {
    super(`Usuário com email ${email} não encontrado`);
    this.name = 'UserNotFoundError';
  }
}

/**
 * Custom error class for invalid password scenarios.
 * 
 * @class InvalidPasswordError
 * @extends {Error}
 * @property {number} status - HTTP status code (401)
 */
export class InvalidPasswordError extends Error {
  public readonly status: number;

  constructor(message: string = 'Senha inválida', status: number = 401) {
    super(message);
    this.name = 'InvalidPasswordError';
    this.status = status;
  }
}

/**
 * Custom error class for invalid email scenarios.
 * 
 * @class InvalidEmailError
 * @extends {Error}
 * @property {number} status - HTTP status code (400)
 */
export class InvalidEmailError extends Error {
  public readonly status: number;

  constructor(message: string = 'Email inválido', status: number = 400) {
    super(message);
    this.name = 'InvalidEmailError';
    this.status = status;
  }
}