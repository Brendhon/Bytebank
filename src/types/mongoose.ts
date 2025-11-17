import mongoose, { Connection } from 'mongoose';

/**
 * Interface for the Mongoose cache stored in the global scope
 * @interface MongooseCache
 * @description Represents the cached MongoDB connection state to avoid multiple connections in serverless environments
 */
export interface MongooseCache {
  /** The established MongoDB connection, or null if not connected */
  conn: Connection | null;
  /** The promise of the connection being established, or null if no connection is in progress */
  promise: Promise<typeof mongoose> | null;
}

/**
 * Global type declaration for Mongoose cache
 * Extends the global scope to include the mongoose cache without using type assertions
 */
declare global {
  var mongoose: MongooseCache | undefined;
}

