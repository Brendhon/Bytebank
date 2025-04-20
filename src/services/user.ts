import { IUser } from "@/types/user";
import { request } from "./apiClient";

/**
 * Registers a new user by sending a POST request to the API.
 * @param {IUser} data - The user data to register
 * @returns {Promise<IUser>} - The registered user data
 */
export function registerUser(data: IUser): Promise<IUser> {
  return request<IUser>('POST', '/api/users', data);
}

/**
 * Fetches all users by sending a GET request to the API.
 * @returns {Promise<IUser[]>} - An array of user data
 */
export function getAllUsers(): Promise<IUser[]> {
  return request<IUser[]>('GET', '/api/users');
}
/**
 * Deletes a user by sending a DELETE request to the API.
 * @param {string} email - The email of the user to delete
 * @returns {Promise<IUser>} - The deleted user data
 */
export function deleteUser(email: string): Promise<IUser> {
  return request<IUser>('DELETE', `/api/users/${email}`);
}

/**
 * Updates a user by sending a PUT request to the API.
 * @param {string} email - Current email of the user
 * @param {IUser} data - The user data to update
 * @returns {Promise<IUser>} - The updated user data
 */
export function updateUser(email: string, data: IUser): Promise<IUser> {
  return request<IUser>('PUT', `/api/users/${email}`, data);
}

/**
 * Fetches a user by email by sending a GET request to the API.
 * @param {string} email - The email of the user to fetch
 * @returns {Promise<IUser>} - The user data
 */
export function getUserByEmail(email: string): Promise<IUser> {
  return request<IUser>('GET', `/api/users/${email}`);
}
