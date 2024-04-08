import { Document, Types } from 'mongoose';

export interface Note {
  title: string;
  description?: string;
  complete: boolean;
  userId: Types.ObjectId;
  id: Types.ObjectId;
}

export type NewNote = Omit<Note, 'id'>;
export interface NewNoteDocument extends NewNote, Document {}
