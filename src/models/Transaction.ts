import { Schema, model, models, Document } from 'mongoose';

// Define the interface for the Transaction document
export interface TransactionType extends Document {
  type: 'deposit' | 'transfer' | 'withdrawal';
  amount: number;
  date: Date;
  description?: string;
}

// Define the schema for the Transaction model
const TransactionSchema = new Schema<TransactionType>(
  {
    type: {
      type: String,
      enum: ['deposit', 'transfer', 'withdrawal'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Get the model from the models object or create a new one if it doesn't exist
// This is useful for avoiding "OverwriteModelError" when using hot reloading in development
const Transaction = models.Transaction || model<TransactionType>('Transaction', TransactionSchema);

// Export the Transaction model
export default Transaction;
