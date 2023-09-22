import * as mongoose from 'mongoose';

export const PassengerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);
