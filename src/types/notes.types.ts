import { GetType } from './main';
import { Model } from 'mongoose';

export type Note = GetType<'Note'>;
export type NewNote = GetType<'NewNote'>;
export type UpdateNote = GetType<'UpdateNote'>;

interface NoteSchema extends Omit<Note, 'id'> {}
export interface NoteDocument extends NoteSchema, Document {}
export interface NoteSchemaModel extends Model<NoteDocument> {}
