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
 * @param {string} id - The ID of the user to delete
 * @returns {Promise<IUser>} - The deleted user data
 */
export function deleteUser(id: string): Promise<IUser> {
  return request<IUser>('DELETE', `/api/users/${id}`);
}

/**
 * Updates a user by sending a PUT request to the API.
 * @param {IUser} data - The user data to update
 * @returns {Promise<IUser>} - The updated user data
 */
export function updateUser(data: IUser): Promise<IUser> {
  return request<IUser>('PUT', `/api/users/${data.id}`, data);
}

/**
 * Fetches a user by ID by sending a GET request to the API.
 * @param {string} id - The ID of the user to fetch
 * @returns {Promise<IUser>} - The user data
 */
export function getUserById(id: string): Promise<IUser> {
  return request<IUser>('GET', `/api/users/${id}`);
}
