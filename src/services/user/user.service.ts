import { API_ROUTES } from "@/lib/constants";
import { isEmailFormatValid, removeEmptyFields } from "@/lib/utils/utils";
import { AccountFormData } from "@/schemas";
import { request } from "@/services/apiClient/apiClient";
import { IUser, IUserUpdateData, InvalidEmailError } from "@/types/user";

// Base URL of the API
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

/**
 * Forms the endpoint for the API
 * @param {string} email - The email of the user
 * @returns {string} - The endpoint URL
 */
function getEndpoint(email?: string | null | undefined): string {
  const path = email ? API_ROUTES.USERS.BY_EMAIL(email) : API_ROUTES.USERS.BASE;
  return `${baseUrl}${path}`;
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
 * Password validation is performed server-side.
 * @param {string} email - The email of the user to delete
 * @param {string} password - The password for authentication
 * @returns {Promise<IUser>} - The deleted user data
 * @throws {InvalidEmailError} - Throws an error if the email is invalid
 */
export async function deleteUser(email: string | null | undefined, password: string): Promise<IUser> {
  // Check if email is valid (throws InvalidEmailError if invalid)
  validateEmail(email);

  // Send request to API (password validation happens server-side)
  return request<IUser>('DELETE', getEndpoint(email), { password });
}

/**
 * Updates a user by sending a PUT request to the API.
 * Password validation is performed server-side.
 * @param {string} email - Current email of the user
 * @param {AccountFormData} data - The user data to update
 * @returns {Promise<IUser>} - The updated user data
 * @throws {InvalidEmailError} - Throws an error if the email is invalid
 */
export async function updateUser(email: string | null | undefined, data: AccountFormData): Promise<IUser> {
  // Check if email is valid (throws InvalidEmailError if invalid)
  validateEmail(email);

  // Prepare data for API request
  const updateData: IUserUpdateData = {
    name: data.name,
    email: data.email,
    currentPassword: data.password,
  };

  // Set new password
  if (data.newPassword) updateData.password = data.newPassword;

  // Remove empty fields from data
  const cleanedData = removeEmptyFields(updateData);

  // Send data to API
  return request<IUser>('PUT', getEndpoint(email), cleanedData);
}

/**
 * Fetches a user by email by sending a GET request to the API.
 * @param {string} email - The email of the user to fetch
 * @returns {Promise<IUser>} - The user data
 */
export async function getUserByEmail(email: string | null | undefined): Promise<IUser> {
  // Check if email is valid (throws InvalidEmailError if invalid)
  validateEmail(email);

  // Send request to API
  return request<IUser>('GET', getEndpoint(email));
}

/**
 * Checks if email is valid (exists and has valid format)
 * @param {string} email - The email to check
 * @returns {void}
 * @throws {InvalidEmailError} - Throws an error if the email is invalid or has invalid format
 */
function validateEmail(email: string | null | undefined): void {
  // Check if email exists
  if (!email) throw new InvalidEmailError('Email is required');

  // Validate email format
  if (!isEmailFormatValid(email)) throw new InvalidEmailError('Invalid email format');
}