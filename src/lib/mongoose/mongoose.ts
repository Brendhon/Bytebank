import mongoose, { Connection } from 'mongoose';
import { MONGO_URI_REGEX } from '../constants/regex/regex';
import type { MongooseCache } from '../../types/mongoose';

// Import the types file to ensure declare global is executed
import '../../types/mongoose';

/**
 * MongoDB connection URI from environment variables
 */
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('❌ Please define the MONGODB_URI environment variable in .env.local');
}

// Validate MongoDB URI format
if (!MONGO_URI_REGEX.test(MONGODB_URI)) {
  throw new Error('❌ MONGODB_URI must be a valid MongoDB connection string');
}

// Global variable to maintain a cached connection
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

// Check if the cached connection is already established
if (!global.mongoose) global.mongoose = cached;

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
      serverSelectionTimeoutMS: 5000, // 5 seconds
      socketTimeoutMS: 45000, // 45 seconds
    });
  }

  try {
    // Wait for the connection to be established
    await cached.promise;
    cached.conn = mongoose.connection;

    // Log the successful connection
    console.log('✅ MongoDB connected successfully');

    // Return the established connection
    return cached.conn;
  } catch (error) {
    // Clear the promise on error to allow retry
    cached.promise = null;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`❌ MongoDB connection failed: ${errorMessage}`);
  }
}
