import { Schema, model } from 'mongoose';

export interface ActivityDocument {
  user: string;
  team: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
}

const activitySchema = new Schema<ActivityDocument>({
  user: { type: String, required: true },
  team: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, required: true },
});

export default model<ActivityDocument>('Activity', activitySchema);
