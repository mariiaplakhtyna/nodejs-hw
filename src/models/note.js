import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    tag: {
      type: String,
      enum: ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'],
      default: 'Personal',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Note = model('note', noteSchema);