import mongoose, { Schema, Document } from 'mongoose';
import { Users } from '../interfaces/User';

const UserSchema: Schema<Users> = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model<Users>('User', UserSchema);