import { Schema, model } from 'mongoose';

export interface LeaderboardDocument {
  name: string;
  category: string;
  score: number;
  rank: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<LeaderboardDocument>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
  updatedAt: { type: Date, default: () => new Date() },
});

export default model<LeaderboardDocument>('Leaderboard', leaderboardSchema);
