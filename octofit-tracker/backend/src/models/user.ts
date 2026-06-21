import { Schema, model } from 'mongoose';

export interface UserDocument {
  name: string;
  email: string;
  role: string;
  team: string;
  createdAt: Date;
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  team: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() },
});

export default model<UserDocument>('User', userSchema);
