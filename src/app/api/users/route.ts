import { handleErrorResponse, handleSuccessResponse, isReqAuthenticated } from '@/lib/api/api';
import { connectToDatabase } from '@/lib/mongoose/mongoose';
import User from '@/models/User/User';
import { IUser } from '@/types/user';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

/**
 * Handles GET requests to retrieve all User records.
 * @param {Request} req - The incoming HTTP request.
 * @returns A response object containing the User data in JSON format
 */
export async function GET(req: Request) {
  try {
    // Check if the request is authenticated
    isReqAuthenticated(req);

    // Check if the request method is GET
    await connectToDatabase();

    // Fetch all Users from the database
    const users = await User.find();

    // Check if there are no Users
    return handleSuccessResponse<IUser[]>(users);
  } catch (error) {
    return handleErrorResponse(error, 'Erro ao buscar usuários');
  }
}

/**
 * Handles POST requests to create a new User record.
 * @param {Request} req - The incoming HTTP request.
 * @returns A response object indicating the success or failure of the operation
 */
export async function POST(req: Request) {
  try {
    // Check if the request is authenticated
    isReqAuthenticated(req);

    // Check if the request method is POST
    await connectToDatabase();

    // Parse the request body as JSON
    const data = await req.json();

    // Check if user already exists
    const user = await User.findOne({ email: data.email });

    // If user exists, throw an error
    if (user) throw new Error('Usuário já cadastrado na plataforma', { cause: { status: 409 } });

    // Hash the password using bcrypt
    const password = await bcrypt.hash(data.password, 10);

    // Create a new User record in the database
    const result = await User.create({ ...data, password });

    // Return a success response with the created User
    return handleSuccessResponse(result);
  } catch (error) {
    return handleErrorResponse(error, 'Erro ao criar usuário');
  }
}