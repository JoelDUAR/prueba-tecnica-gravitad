const { Document } = require('mongoose');

export interface Characters extends Document {
  _id: number,
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  isFromApi: boolean;
  createdAt: Date;
  updatedAt: Date;
};