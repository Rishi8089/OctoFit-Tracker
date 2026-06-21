import { Schema, model } from 'mongoose';

export interface TeamDocument {
  name: string;
  coach: string;
  members: number;
  createdAt: Date;
}

const teamSchema = new Schema<TeamDocument>({
  name: { type: String, required: true },
  coach: { type: String, required: true },
  members: { type: Number, required: true },
  createdAt: { type: Date, default: () => new Date() },
});

export default model<TeamDocument>('Team', teamSchema);
