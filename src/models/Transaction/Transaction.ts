import { ITransaction, TransactionDesc, TransactionType } from '@/types/transaction';
import { DATE_REGEX } from '@/lib/constants/regex/regex';
import { Document, Schema, Types, model, models } from 'mongoose';

/**
 * Interface for the Transaction document combining Mongoose Document with ITransaction
 * Overrides the user field to use Types.ObjectId for MongoDB reference
 */
type SchemaType = Document & Omit<ITransaction, 'user'> & {
  user: Types.ObjectId;
};

/**
 * Transaction Mongoose Schema
 * 
 * Defines the structure and validation rules for transaction documents in MongoDB.
 * Includes validation for user reference, description, type, value, date, and optional alias.
 * 
 * Note: Value validation allows values from 0 to 999,999,999.99 with maximum 2 decimal places.
 * Date validation ensures format dd/mm/yyyy using shared DATE_REGEX constant.
 * 
 * @example
 * ```typescript
 * const transaction = new Transaction({
 *   user: userId,
 *   desc: 'deposit',
 *   type: 'inflow',
 *   value: 1000.50,
 *   date: '18/04/2025',
 *   alias: 'Salary'
 * });
 * await transaction.save();
 * ```
 */
const TransactionSchema = new Schema<SchemaType>(
  {
    /**
     * Reference to the User who owns this transaction
     * MongoDB ObjectId reference to the User model
     */
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
    },
    /**
     * Transaction description category
     * Must be one of the keys from TransactionDesc enum
     */
    desc: {
      type: String,
      enum: {
        values: Object.keys(TransactionDesc),
        message: 'Invalid transaction description',
      },
      required: [true, 'Transaction description is required'],
    },
    /**
     * Transaction type (cash flow direction)
     * Must be one of the keys from TransactionType enum (inflow or outflow)
     */
    type: {
      type: String,
      enum: {
        values: Object.keys(TransactionType),
        message: 'Invalid transaction type',
      },
      required: [true, 'Transaction type is required'],
    },
    /**
     * Transaction monetary value
     * Must be between 0 and 999,999,999.99 with maximum 2 decimal places
     */
    value: {
      type: Number,
      required: [true, 'Transaction value is required'],
      min: [0, 'Transaction value must be greater than or equal to 0'],
      max: [999999999.99, 'Transaction value is too large'],
      validate: {
        validator: function(v: number) {
          const decimalPlaces = (v.toString().split('.')[1] || '').length;
          return decimalPlaces <= 2;
        },
        message: 'Transaction value cannot have more than 2 decimal places',
      },
    },
    /**
     * Transaction date in format dd/mm/yyyy
     * Validated using DATE_REGEX shared constant
     */
    date: {
      type: String,
      required: [true, 'Transaction date is required'],
      validate: {
        validator: (v: string) => DATE_REGEX.test(v),
        message: 'Date must be in format dd/mm/yyyy',
      },
    },
    /**
     * Optional transaction alias/description
     * Maximum 100 characters
     */
    alias: {
      type: String,
      maxlength: [100, 'Alias cannot exceed 100 characters'],
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

/**
 * Create a compound index on user and date fields for better query performance
 * Indexes user in ascending order and date in descending order
 * This optimizes queries that filter by user and sort by date (most recent first)
 */
TransactionSchema.index({ user: 1, date: -1 });

/**
 * Transaction Mongoose Model
 * 
 * Represents a financial transaction in the system. The model is retrieved from the
 * models cache or created if it doesn't exist, preventing "OverwriteModelError"
 * when using hot reloading in development.
 * 
 * @example
 * ```typescript
 * import Transaction from '@/models/Transaction/Transaction';
 * 
 * const transactions = await Transaction.find({ user: userId })
 *   .sort({ date: -1 })
 *   .populate('user');
 * ```
 */
const Transaction = models.Transaction || model<SchemaType>('Transaction', TransactionSchema);

export default Transaction;
