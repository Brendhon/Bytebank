import { connectToDatabase } from '@/lib/mongoose';
import User from '@/models/User';
import { IUser } from '@/types/user';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

interface Params { params: Promise<{ email: string }> }

// DELETE /api/users/:email
export async function DELETE(req: Request, { params }: Params) {
  // Connect to the database
  await connectToDatabase();

  // Get email from params
  const { email } = await params;

  // Check if email is valid
  const deletedUser = await User.findOneAndDelete<IUser>({ email });

  // Return the response
  return getResponse(deletedUser);
}

// PUT /api/users/:email
export async function PUT(req: Request, { params }: Params) {
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
  return getResponse(user);
}

// GET /api/users/:email
export async function GET(req: Request, { params }: Params) {
  // Connect to the database
  await connectToDatabase();

  // Get email from params
  const { email } = await params;

  // Get the User record from the database
  const user = await User.findOne<IUser>({ email });

  // Return a success response with the User
  return getResponse(user);
}

/**
 * Function to return the response
 * @param {IUser} user - The user object
 * @returns {NextResponse} - The response object
 */
function getResponse(user: IUser | null): NextResponse {
  return user
    ? NextResponse.json(user)
    : NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
}
