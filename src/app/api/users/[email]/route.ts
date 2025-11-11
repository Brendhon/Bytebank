import { handleErrorResponse, handleSuccessResponse, isReqAuthenticated } from '@/lib/api/api';
import { connectToDatabase } from '@/lib/mongoose/mongoose';
import User from '@/models/User';
import { IUser } from '@/types/user';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

interface Params { params: Promise<{ email: string }> }

// DELETE /api/users/:email
export async function DELETE(req: Request, { params }: Params) {
  try {
    // Check if the request is authenticated
    isReqAuthenticated(req);

    // Connect to the database
    await connectToDatabase();

    // Get email from params
    const { email } = await params;

    // Check if email is valid
    const deletedUser = await User.findOneAndDelete<IUser>({ email });

    // Return the response
    return handleSuccess(deletedUser);
  } catch (error) {
    return handleErrorResponse(error, 'Erro ao deletar usuário');
  }
}

// PUT /api/users/:email
export async function PUT(req: Request, { params }: Params) {
  try {
    // Check if the request is authenticated
    isReqAuthenticated(req);

    // Connect to the database
    await connectToDatabase();

    // Get email from params
    const { email } = await params;

    // Parse the request body as JSON
    const data = await req.json();

    // Hash the password using bcrypt
    if (data.password) data.password = await bcrypt.hash(data.password, 10);

    // Update the User record in the database
    const user = await User.findOneAndUpdate<IUser>({ email }, data, { new: true });

    // Return a success response with the updated User
    return handleSuccess(user);
  } catch (error) {
    return handleErrorResponse(error, 'Erro ao atualizar usuário');
  }
}

// GET /api/users/:email
export async function GET(req: Request, { params }: Params) {
  try {
    // Check if the request is authenticated
    isReqAuthenticated(req);

    // Connect to the database
    await connectToDatabase();

    // Get email from params
    const { email } = await params;

    // Get the User record from the database
    const user = await User.findOne<IUser>({ email });

    // Return a success response with the User
    return handleSuccess(user);
  } catch (error) {
    return handleErrorResponse(error, 'Erro ao buscar usuário');
  }
}

/**
 * Handle success
 * @param {IUser} user - The user object
 * @returns {NextResponse} - The NextResponse object
 */
function handleSuccess(user: IUser | null): NextResponse {
  return handleSuccessResponse(user, 'Usuário não encontrado');
}