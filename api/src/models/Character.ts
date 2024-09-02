import mongoose, { Schema } from 'mongoose';
import { Characters }  from '../interfaces/Character';

const CharacterSchema: Schema = new Schema(
  {
    _id: { type: Number, required: true },
    name: { type: String, required: true },
    status: { type: String, required: true },
    species: { type: String, required: true },
    type: { type: String, required: false },
    gender: { type: String, required: true },
    image: { type: String, required: true },
    isFromApi: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<Characters>('Character', CharacterSchema);