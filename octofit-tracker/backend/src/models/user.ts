import mongoose, { Schema, model, type Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  age: number;
  fitnessLevel: string;
  teamId?: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  fitnessLevel: { type: String, required: true },
  teamId: { type: String },
}, { timestamps: true });

export const User = model<IUser>('User', userSchema);
