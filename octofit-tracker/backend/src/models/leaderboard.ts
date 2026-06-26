import { Schema, model, type Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: string;
  teamId?: string;
  points: number;
  rank: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userId: { type: String, required: true },
  teamId: { type: String },
  points: { type: Number, required: true, default: 0 },
  rank: { type: Number, required: true, default: 1 },
}, { timestamps: true });

export const Leaderboard = model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
