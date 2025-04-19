import { ITransaction, TransactionDesc } from '@/types/transaction';
import { Document, Schema, model, models } from 'mongoose';

// Define the interface for the Transaction document
type SchemaType = Document & ITransaction;

// Define the schema for the Transaction model
const TransactionSchema = new Schema<SchemaType>(
  {
    desc: {
      type: String,
      enum: Object.keys(TransactionDesc),
      required: true,
    },
    value: {
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
const Transaction = models.Transaction || model<SchemaType>('Transaction', TransactionSchema);

// Export the Transaction model
export default Transaction;
