import NoteModel from '../models/note.model';
import { NewNote, Note, UpdateNote } from '../types/notes.types';

export async function addNote(newNote: NewNote) {
  const note = new NoteModel(newNote);
  await note.save();
  return note;
}
export async function removeNote({ noteId }: { noteId: string }) {
  const deletedNote = await NoteModel.findOneAndDelete({ _id: noteId });
  return deletedNote;
}
export async function getNotes() {
  const notes: Note[] = await NoteModel.find({});
  return notes;
}
export async function updateNote({ noteId, updateData }: { noteId: string; updateData: Partial<UpdateNote> }) {
  const updatedNote = await NoteModel.findOneAndUpdate({ _id: noteId }, updateData);
  return updatedNote;
}
export async function complete(id: string) {
  const updatedNote = await NoteModel.findOneAndUpdate({ _id: id }, { complete: true });
  return updatedNote;
}
export async function unComplete(id: string) {
  const updatedNote = await NoteModel.findOneAndUpdate({ _id: id }, { complete: false });
  return updatedNote;
}
export async function getNoteById(noteId: string) {
  const note = await NoteModel.findById(noteId);
  return note;
}
