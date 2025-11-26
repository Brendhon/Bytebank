import { handleErrorResponse, handleSuccessResponse, isAuthenticated } from '@/lib/api/api';
import { EMAIL_REGEX } from '@/lib/constants';
import { connectToDatabase } from '@/lib/mongoose/mongoose';
import User from '@/models/User/User';
import { HttpError } from '@/types/http';
import { IUser } from '@/types/user';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

interface Params { params: Promise<{ email: string }> }

/**
 * Validates a user's password by comparing it with the hashed password in the database.
 * 
 * This function validates the email format, finds the user in the database, and compares
 * the provided plain text password with the hashed password stored in the database.
 * 
 * @param {string} email - The email of the user to validate
 * @param {string} plainPassword - The plain text password to validate
 * @returns {Promise<void>} - Resolves if the password is valid, throws error otherwise
 * @throws {HttpError} Throws 400 Bad Request if email is invalid or missing
 * @throws {HttpError} Throws 404 Not Found if user does not exist
 * @throws {HttpError} Throws 401 Unauthorized if password is invalid
 */
async function validatePassword(email: string, plainPassword: string): Promise<void> {
  if (!email) {
    throw HttpError.badRequest('Email is required');
  }

  if (!EMAIL_REGEX.test(email)) {
    throw HttpError.badRequest('Invalid email format');
  }

  const user = await User.findOne<IUser>({ email });

  if (!user) {
    throw HttpError.notFound(`User with email ${email} not found`);
  }

  const isValid = await bcrypt.compare(plainPassword, user.password);

  if (!isValid) {
    throw HttpError.unauthorized('Invalid password');
  }
}

/**
 * Handles DELETE requests to delete a user by email for the authenticated user.
 * 
 * This endpoint requires authentication via NextAuth session. It validates the email format,
 * verifies that the authenticated user is trying to delete their own account, validates the
 * password for security, and then deletes the user from the database.
 * 
 * @param {Request} req - The incoming HTTP request containing password in the body.
 * @param {Params} params - Route parameters containing the user email.
 * @returns {Promise<NextResponse>} A response object containing the deleted user data
 * @throws {HttpError} Throws 401 Unauthorized if user is not authenticated or password is invalid
 * @throws {HttpError} Throws 400 Bad Request if email format is invalid
 * @throws {HttpError} Throws 403 Forbidden if user tries to delete another user's account
 * @throws {HttpError} Throws 404 Not Found if user does not exist
 */
export async function DELETE(req: Request, { params }: Params): Promise<NextResponse> {
  try {
    const session = await isAuthenticated();
    await connectToDatabase();

    const { email } = await params;

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      throw HttpError.badRequest('Invalid email format');
    }

    // Verify that the authenticated user is trying to delete their own account
    if (session.user.email !== email) {
      throw HttpError.forbidden('Forbidden: You can only delete your own account');
    }

    const { password } = await req.json();

    // Validate password (throws HttpError if invalid)
    await validatePassword(email, password);

    const deletedUser = await User.findOneAndDelete<IUser>({ email });

    if (!deletedUser) {
      throw HttpError.notFound(`User with email ${email} not found`);
    }

    return handleSuccess(deletedUser);
  } catch (error) {
    return handleErrorResponse(error, 'Error deleting user');
  }
}

/**
 * Handles PUT requests to update a user by email for the authenticated user.
 * 
 * This endpoint requires authentication via NextAuth session. It validates the email format,
 * verifies that the authenticated user is trying to update their own account, validates the
 * current password if provided, hashes the new password if provided, and then updates the
 * user in the database. The current password is required only when updating the password.
 * 
 * @param {Request} req - The incoming HTTP request containing user data in the body.
 * @param {Params} params - Route parameters containing the user email.
 * @returns {Promise<NextResponse>} A response object containing the updated user data
 * @throws {HttpError} Throws 401 Unauthorized if user is not authenticated or password is invalid
 * @throws {HttpError} Throws 400 Bad Request if email format is invalid or current password is missing when updating password
 * @throws {HttpError} Throws 403 Forbidden if user tries to update another user's account
 * @throws {HttpError} Throws 404 Not Found if user does not exist
 */
export async function PUT(req: Request, { params }: Params): Promise<NextResponse> {
  try {
    const session = await isAuthenticated();
    await connectToDatabase();

    const { email } = await params;

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      throw HttpError.badRequest('Invalid email format');
    }

    // Verify that the authenticated user is trying to update their own account
    if (session.user.email !== email) {
      throw HttpError.forbidden('Forbidden: You can only update your own account');
    }

    // Parse the request body as JSON
    const data = await req.json();

    // Validate the current password
    await validatePassword(email, data.currentPassword);

    // Remove currentPassword from update data
    delete data.currentPassword;

    // Hash the new password
    if (data.password) data.password = await bcrypt.hash(data.password, 10);

    // Update the User record in the database
    const user = await User.findOneAndUpdate<IUser>({ email }, data, { new: true });

    // Return a success response with the updated User
    return handleSuccess(user);
  } catch (error) {
    return handleErrorResponse(error, 'Erro ao atualizar usuário');
  }
}

/**
 * Handles GET requests to retrieve a user by email for the authenticated user.
 * 
 * This endpoint requires authentication via NextAuth session. It validates the email format,
 * verifies that the authenticated user is trying to access their own account, and then
 * retrieves the user data from the database.
 * 
 * @param {Request} req - The incoming HTTP request.
 * @param {Params} params - Route parameters containing the user email.
 * @returns {Promise<NextResponse>} A response object containing the user data in JSON format
 * @throws {HttpError} Throws 401 Unauthorized if user is not authenticated
 * @throws {HttpError} Throws 400 Bad Request if email format is invalid
 * @throws {HttpError} Throws 403 Forbidden if user tries to access another user's account
 * @throws {HttpError} Throws 404 Not Found if user does not exist
 */
export async function GET(req: Request, { params }: Params): Promise<NextResponse> {
  try {
    const session = await isAuthenticated();
    await connectToDatabase();

    const { email } = await params;

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      throw HttpError.badRequest('Invalid email format');
    }

    // Verify that the authenticated user is trying to access their own account
    if (session.user.email !== email) {
      throw HttpError.forbidden('Forbidden: You can only access your own account');
    }

    const user = await User.findOne<IUser>({ email });

    return handleSuccess(user);
  } catch (error) {
    return handleErrorResponse(error, 'Error fetching user');
  }
}

/**
 * Handles successful responses for user operations.
 * 
 * This helper function standardizes the response format for successful user operations.
 * It uses the centralized `handleSuccessResponse` helper which automatically handles
 * null values by returning a 404 Not Found response.
 * 
 * @param {IUser | null} user - The user object or null if not found
 * @returns {NextResponse} The NextResponse object with user data or 404 error if user is null
 */
function handleSuccess(user: IUser | null): NextResponse {
  return handleSuccessResponse<IUser>(user);
}