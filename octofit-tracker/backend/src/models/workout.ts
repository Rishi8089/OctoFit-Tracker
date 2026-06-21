import { Schema, model } from 'mongoose';

export interface WorkoutDocument {
  name: string;
  focus: string;
  durationMinutes: number;
  difficulty: string;
  caloriesTarget: number;
  createdAt: Date;
}

const workoutSchema = new Schema<WorkoutDocument>({
  name: { type: String, required: true },
  focus: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true },
  caloriesTarget: { type: Number, required: true },
  createdAt: { type: Date, default: () => new Date() },
});

export default model<WorkoutDocument>('Workout', workoutSchema);
