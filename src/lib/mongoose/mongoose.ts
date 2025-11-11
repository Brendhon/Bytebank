import mongoose, { Connection } from 'mongoose';

// MongoDB connection URI
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('❌ Please define the MONGODB_URI environment variable in .env.local');
}

// Global variable to maintain a cached connection
let cached = (global as any).mongoose;

// Check if the cached connection is already established
if (!cached) cached = (global as any).mongoose = { conn: null, promise: null };

/**
 * Connects to the MongoDB database
 * @returns {Promise<Connection>} The MongoDB connection
 */
export async function connectToDatabase(): Promise<Connection> {
  // If the connection is already established, return it
  if (cached.conn) return cached.conn;

  // If a connection promise is already in progress, return it
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'bytebank',
      bufferCommands: false,
    });
  }

  try {
    // Wait for the connection to be established
    cached.conn = await cached.promise;

    // Log the successful connection
    console.log('✅ MongoDB connected successfully');

    // Return the established connection
    return cached.conn;
  } catch (error) {
    throw new Error(`❌ MongoDB connection failed: ${(error as Error).message}`);
  }
}
