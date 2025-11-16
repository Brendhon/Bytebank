import { handleErrorResponse, handleSuccessResponse, isAuthenticated } from '@/lib/api/api';
import { connectToDatabase } from '@/lib/mongoose/mongoose';
import User from '@/models/User/User';
import { HttpError } from '@/types/http';
import { IUser } from '@/types/user';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

interface Params { params: Promise<{ email: string }> }

/**
 * Validates a user's password by comparing it with the hashed password in the database.
 * @param {string} email - The email of the user
 * @param {string} plainPassword - The plain text password to validate
 * @returns {Promise<void>} - Resolves if the password is valid, throws error otherwise
 * @throws {HttpError} - Throws HttpError with appropriate status code if validation fails
 */
async function validatePassword(email: string, plainPassword: string): Promise<void> {
  // Check if email is valid
  if (!email) throw HttpError.badRequest('Email inválido');

  // Find the user in the database
  const user = await User.findOne<IUser>({ email });

  // Check if user exists
  if (!user) throw HttpError.notFound(`Usuário com email ${email} não encontrado`);

  // Compare the plain text password with the hashed password
  const isValid = await bcrypt.compare(plainPassword, user.password);

  // If the password is invalid, throw an error
  if (!isValid) throw HttpError.unauthorized('Senha inválida');
}

/**
 * Handles DELETE requests to delete a user by email.
 * Requires password validation for security.
 * @param {Request} req - The incoming HTTP request containing password in body
 * @param {Params} params - Route parameters containing user email
 * @returns {Promise<NextResponse>} - Response object indicating success or failure
 */
export async function DELETE(req: Request, { params }: Params): Promise<NextResponse> {
  try {
    // Check if the request is authenticated using NextAuth session
    const session = await isAuthenticated();

    // Connect to the database
    await connectToDatabase();

    // Get email from params
    const { email } = await params;

    // Verify that the authenticated user is trying to delete their own account
    if (session.user.email !== email) {
      throw HttpError.forbidden('Forbidden: You can only delete your own account');
    }

    // Parse the request body to get password
    const { password } = await req.json();

    // Validate password (throws HttpError if invalid)
    await validatePassword(email, password);

    // Delete the user from the database
    const deletedUser = await User.findOneAndDelete<IUser>({ email });

    // Check if user was found and deleted
    if (!deletedUser) throw HttpError.notFound(`Usuário com email ${email} não encontrado`);

    // Return the response
    return handleSuccess(deletedUser);
  } catch (error) {
    return handleErrorResponse(error, 'Erro ao deletar usuário');
  }
}

/**
 * Handles PUT requests to update a user by email.
 * Requires password validation if password is being updated.
 * @param {Request} req - The incoming HTTP request containing user data in body
 * @param {Params} params - Route parameters containing user email
 * @returns {Promise<NextResponse>} - Response object indicating success or failure
 */
export async function PUT(req: Request, { params }: Params): Promise<NextResponse> {
  try {
    // Check if the request is authenticated using NextAuth session
    const session = await isAuthenticated();

    // Connect to the database
    await connectToDatabase();

    // Get email from params
    const { email } = await params;

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
 * Handles GET requests to fetch a user by email.
 * @param {Request} req - The incoming HTTP request
 * @param {Params} params - Route parameters containing user email
 * @returns {Promise<NextResponse>} - Response object with user data or error
 */
export async function GET(req: Request, { params }: Params): Promise<NextResponse> {
  try {
    // Check if the request is authenticated using NextAuth session
    const session = await isAuthenticated();

    // Connect to the database
    await connectToDatabase();

    // Get email from params
    const { email } = await params;

    // Verify that the authenticated user is trying to access their own account
    if (session.user.email !== email) {
      throw HttpError.forbidden('Forbidden: You can only access your own account');
    }

    // Get the User record from the database
    const user = await User.findOne<IUser>({ email });

    // Return a success response with the User
    return handleSuccess(user);
  } catch (error) {
    return handleErrorResponse(error, 'Erro ao buscar usuário');
  }
}

/**
 * Handles successful responses for user operations.
 * @param {IUser | null} user - The user object or null if not found
 * @returns {NextResponse} - The NextResponse object with user data or 404 error
 */
function handleSuccess(user: IUser | null): NextResponse {
  return handleSuccessResponse<IUser>(user);
}