import { IUser } from '@/types/user';
import { Document, Schema, model, models } from 'mongoose';

// Define the interface for the User document 
type UserType = Exclude<Document, IUser>;

// Define the User schema
const UserSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    acceptPrivacy: { type: Boolean, required: true },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Get the model from the models object or create a new one if it doesn't exist
// This is useful for avoiding "OverwriteModelError" when using hot reloading in development
export default models.User || model<UserType>('User', UserSchema);
