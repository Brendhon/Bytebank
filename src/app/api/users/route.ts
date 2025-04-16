import { connectToDatabase } from '@/lib/mongoose';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

/**
 * Handles GET requests to retrieve all User records.
 * @param {Request} req - The incoming HTTP request.
 * @returns A response object containing the User data in JSON format
 */
export async function GET(req: Request) {
  // Check if the request method is GET
  await connectToDatabase();

  // Fetch all Users from the database
  const users = await User.find();

  // Check if there are no Users
  return Response.json(users);
}

/**
 * Handles POST requests to create a new User record.
 * @param {Request} req - The incoming HTTP request.
 * @returns A response object indicating the success or failure of the operation
 */
export async function POST(req: Request) {
  // Check if the request method is POST
  await connectToDatabase();

  // Parse the request body as JSON
  const data = await req.json();

  // Hash the password using bcrypt
  const password = await bcrypt.hash(data.password, 10);

  // Create a new User record in the database
  const user = await User.create({ ...data, password });

  // Return a success response with the created User
  return Response.json(user);
}