import { IUser } from '@/types/user';
import { EMAIL_REGEX } from '@/lib/constants/regex/regex';
import { Document, Schema, model, models } from 'mongoose';

/**
 * Interface for the User document combining Mongoose Document with IUser
 */
type SchemaType = Document & IUser;

/**
 * User Mongoose Schema
 * 
 * Defines the structure and validation rules for user documents in MongoDB.
 * Includes validation for name, email, password, and privacy policy acceptance.
 * 
 * Note: Password validation in this model maintains minimum 6 characters for
 * backward compatibility with existing users. Strong password validation
 * (8+ characters with complexity) is enforced at the schema validation level
 * (register.schema.ts, account.schema.ts) before data reaches this model.
 * 
 * @example
 * ```typescript
 * const user = new User({
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   password: 'hashedPassword123',
 *   acceptPrivacy: true
 * });
 * await user.save();
 * ```
 */
const UserSchema = new Schema<SchemaType>(
  {
    /**
     * User's full name
     * Required field with maximum length validation
     */
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    /**
     * User's email address
     * Required, unique, validated format, normalized to lowercase
     */
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: [255, 'Email cannot exceed 255 characters'],
      validate: {
        validator: (v: string) => EMAIL_REGEX.test(v),
        message: 'Please provide a valid email address',
      },
    },
    /**
     * User's hashed password
     * Required field with length validation for backward compatibility
     * Note: Password strength validation (complexity) is enforced at schema
     * validation level before hashing, not in this model
     */
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      maxlength: [128, 'Password cannot exceed 128 characters'],
    },
    /**
     * Privacy policy acceptance flag
     * Required and must be true for LGPD compliance
     */
    acceptPrivacy: {
      type: Boolean,
      required: [true, 'Privacy policy acceptance is required'],
      validate: {
        validator: (v: boolean) => v === true,
        message: 'You must accept the privacy policy to create an account',
      },
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

/**
 * User Mongoose Model
 * 
 * Represents a user account in the system. The model is retrieved from the
 * models cache or created if it doesn't exist, preventing "OverwriteModelError"
 * when using hot reloading in development.
 * 
 * @example
 * ```typescript
 * import User from '@/models/User/User';
 * 
 * const user = await User.findOne({ email: 'user@example.com' });
 * ```
 */
const User = models.User || model<SchemaType>('User', UserSchema);

export default User;
