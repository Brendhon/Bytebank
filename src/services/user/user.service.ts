import { API_ROUTES } from "@/lib/constants/routes";
import { removeEmptyFields } from "@/lib/utils/utils";
import { AccountFormData } from "@/schemas";
import { request } from "@/services/apiClient/apiClient";
import { IUser } from "@/types/user";
import bcrypt from "bcryptjs";

/**
 * Form the endpoint for the API
 * @param {string} email - The email of the user
 * @returns {string} - The endpoint URL
 */
function getEndpoint(email?: string | null | undefined): string {
  return email ? API_ROUTES.USERS.BY_EMAIL(email) : API_ROUTES.USERS.BASE;
}

/**
 * Registers a new user by sending a POST request to the API.
 * @param {IUser} data - The user data to register
 * @returns {Promise<IUser>} - The registered user data
 */
export async function registerUser(data: IUser): Promise<IUser> {
  // Send request to API
  return request<IUser>('POST', getEndpoint(), data);
}

/**
 * Fetches all users by sending a GET request to the API.
 * @returns {Promise<IUser[]>} - An array of user data
 */
export function getAllUsers(): Promise<IUser[]> {
  return request<IUser[]>('GET', getEndpoint());
}
/**
 * Deletes a user by sending a DELETE request to the API.
 * @param {string} email - The email of the user to delete
 * @returns {Promise<IUser>} - The deleted user data
 */
export async function deleteUser(email: string | null | undefined, password: string): Promise<IUser> {
  // Check if email is valid
  isEmailValid(email);
  
  // Validate password
  await validatePassword(email!, password);

  // Send request to API
  return request<IUser>('DELETE', getEndpoint(email));
}

/**
 * Updates a user by sending a PUT request to the API.
 * @param {string} email - Current email of the user
 * @param {IUser} data - The user data to update
 * @returns {Promise<IUser>} - The updated user data
 */
export async function updateUser(email: string | null | undefined, data: AccountFormData): Promise<IUser> {
  // Check if email is valid
  isEmailValid(email);

  // Validate password
  await validatePassword(email!, data.password);

  // Set password 
  if (data.newPassword) {
    data.password = data.newPassword;
    delete data.newPassword;
    delete data.confirmPassword;
  }

  // Remove empty fields from data
  const cleanedData = removeEmptyFields(data);

  // Send data to API
  return request<IUser>('PUT', getEndpoint(email), cleanedData);
}

/**
 * Fetches a user by email by sending a GET request to the API.
 * @param {string} email - The email of the user to fetch
 * @returns {Promise<IUser>} - The user data
 */
export async function getUserByEmail(email: string | null | undefined): Promise<IUser> {
  // Check if email is valid
  isEmailValid(email);

  // Send request to API
  return request<IUser>('GET', getEndpoint(email));
}

/**
 * Validates a user's password by comparing it with the hashed password in the database.
 * @param {string} email - The email of the user
 * @param {string} plain - The plain text password to validate
 * @returns {Promise<void>} - Resolves if the password is valid, rejects otherwise
 * @throws {Error} - Throws an error if the user is not found or the password is invalid
 */
async function validatePassword(email: string, plain: string): Promise<void> {
  // Connect to the database
  const user = await getUserByEmail(email);

  // Check if email is valid
  if (!user) throw new Error('Usuário não encontrado');

  // Compare the plain text password with the hashed password
  const isValid = await bcrypt.compare(plain, user.password);

  // If the password is invalid, throw an error
  if (!isValid) throw new Error('Senha inválida');
}

/**
 * Check of email is valid
 * @param {string} email - The email to check
 * @returns {Promise<void>} - True if email is valid, false otherwise
 * @throws {Error} - Throws an error if the email is invalid
 */
function isEmailValid(email: string | null | undefined): void {
  // Check if email is valid
  if (!email) throw new Error('Email inválido');
}