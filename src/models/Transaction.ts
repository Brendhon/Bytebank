import { Document, Schema, model, models } from 'mongoose';

// Define the type for the transaction type options
const TypeOptions = ['deposit', 'transfer', 'withdrawal', 'payment'] as const;

// Define the type for the transaction type options
export type TransactionTypeOptions = typeof TypeOptions[number];

// Define the interface for the Transaction document
export interface TransactionType extends Document {
  type: TransactionTypeOptions;
  amount: number;
  date: string;
  alias?: string;
}

// Define the schema for the Transaction model
const TransactionSchema = new Schema<TransactionType>(
  {
    type: {
      type: String,
      enum: TypeOptions,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    alias: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Get the model from the models object or create a new one if it doesn't exist
// This is useful for avoiding "OverwriteModelError" when using hot reloading in development
const Transaction = models.Transaction || model<TransactionType>('Transaction', TransactionSchema);

// Export the Transaction model
export default Transaction;
