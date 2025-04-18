import { connectToDatabase } from '@/lib/mongoose';
import User from '@/models/User';
import { IUser } from '@/types/user';
import { NextResponse } from 'next/server';

interface Params { params: Promise<{ id: string }> }

// DELETE /api/users/:id
export async function DELETE(req: Request, { params }: Params) {
  // Check if the request method is DELETE
  await connectToDatabase();

  // Get id from params
  const { id } = await params;

  // Check if id is valid
  const deletedUser = await User.findByIdAndDelete<IUser>(id);

  // If the user exists and the password is valid
  return getResponse(deletedUser);
}

// PUT /api/users/:id
export async function PUT(req: Request, { params }: Params) {
  // Check if the request method is PUT
  await connectToDatabase();

  // Get id from params
  const { id } = await params;

  // Parse the request body as JSON
  const data = await req.json();

  // Update the User record in the database
  const user = await User.findByIdAndUpdate<IUser>(id, data, { new: true });

  // Return a success response with the updated User
  return getResponse(user);
}

// GET /api/users/:id
export async function GET(req: Request, { params }: Params) {
  // Check if the request method is GET
  await connectToDatabase();

  // Get id from params
  const { id } = await params;

  // Get the User record from the database
  const user = await User.findById<IUser>(id);

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