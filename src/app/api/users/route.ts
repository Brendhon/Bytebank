import { handleErrorResponse, handleSuccessResponse, isAuthenticated } from '@/lib/api/api';
import { EMAIL_REGEX } from '@/lib/constants';
import { connectToDatabase } from '@/lib/mongoose/mongoose';
import User from '@/models/User/User';
import { HttpError } from '@/types/http';
import { IUser } from '@/types/user';
import bcrypt from 'bcryptjs';

/**
 * Handles GET requests to retrieve the authenticated user's own data.
 * 
 * This endpoint requires authentication via NextAuth session. It returns only
 * the authenticated user's data, not all users, to protect user privacy.
 * 
 * @param {Request} req - The incoming HTTP request.
 * @returns {Promise<NextResponse>} A response object containing the authenticated user's data in JSON format
 * @throws {HttpError} Throws 401 Unauthorized if user is not authenticated
 * @throws {HttpError} Throws 404 Not Found if user does not exist
 */
export async function GET(req: Request) {
  try {
    const session = await isAuthenticated();
    await connectToDatabase();

    const user = await User.findById(session.user.id);

    return handleSuccessResponse<IUser>(user);
  } catch (error) {
    return handleErrorResponse(error, 'Error fetching user');
  }
}

/**
 * Handles POST requests to create a new user record.
 * 
 * This endpoint performs basic validation (email format, required fields), checks for duplicate
 * email addresses, hashes the password, and creates a new user in the database.
 * Registration is public and does not require authentication. Full validation is assumed
 * to be done on the frontend before submission.
 * 
 * @param {Request} req - The incoming HTTP request containing user registration data in the body.
 * @returns {Promise<NextResponse>} A response object containing the created user data (without password)
 * @throws {HttpError} Throws 400 Bad Request if validation fails
 * @throws {HttpError} Throws 409 Conflict if user with email already exists
 */
export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();

    // Basic validation (full validation assumed to be done on frontend)
    if (!body.name || !body.email || !body.password) {
      throw HttpError.badRequest('Name, email, and password are required');
    }

    // Validate email format
    if (!EMAIL_REGEX.test(body.email)) {
      throw HttpError.badRequest('Invalid email format');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      throw HttpError.conflict('User already registered');
    }

    // Hash the password using bcrypt
    const password = await bcrypt.hash(body.password, 10);

    // Create user (exclude confirmPassword and acceptPrivacy from DB if present)
    const { confirmPassword, acceptPrivacy, ...userData } = body;
    const result = await User.create({ ...userData, password, acceptPrivacy: true });

    // Return success response (exclude password from response)
    const { password: _, ...userResponse } = result.toObject();
    return handleSuccessResponse<IUser>(userResponse);
  } catch (error) {
    return handleErrorResponse(error, 'Error creating user');
  }
}