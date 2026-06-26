import { Schema, model, type Document } from 'mongoose';

export interface IActivity extends Document {
  userId: string;
  type: string;
  durationMinutes: number;
  points: number;
  date: Date;
  notes?: string;
}

const activitySchema = new Schema<IActivity>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  points: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  notes: { type: String },
}, { timestamps: true });

export const Activity = model<IActivity>('Activity', activitySchema);
