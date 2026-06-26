import { Schema, model, type Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  focus: string;
  durationMinutes: number;
  difficulty: string;
  equipment: string[];
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  focus: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true },
  equipment: { type: [String], default: [] },
}, { timestamps: true });

export const Workout = model<IWorkout>('Workout', workoutSchema);
