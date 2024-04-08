import NoteModel from '../models/Note';
import { ObjectId } from 'mongoose';
import { UpdateNote, Note } from '../types/main';
import { noteValidator, noteUpdateValidate } from '../validate/note.validate';

async function addNote(body: unknown) {
  const data = await noteValidator.validateAsync(body) as Note;
  const note = new NoteModel(data);
  await note.save();
  return note;
}
async function removeNote(noteId: ObjectId, userId: ObjectId) {
  const deletedNote = await NoteModel.findOneAndDelete({ _id: noteId, userId });
  return deletedNote;
}
async function updateNote(noteId: ObjectId, userId: ObjectId, noteData: Partial<UpdateNote>) {
  const updatedUser = await NoteModel.findOneAndUpdate({ _id: noteId, userId }, noteData, { new: true, runValidators: true });
  return updatedUser;
}
async function complete(id: ObjectId, userId: ObjectId) {
  const updatedNote = await NoteModel.findOneAndUpdate({ _id: id, userId }, { complete: true }, { new: true, runValidators: true });
  return updatedNote;
}
async function unComplete(id: ObjectId, userId: ObjectId) {
  const updatedNote = await NoteModel.findOneAndUpdate({ _id: id, userId }, { complete: false }, { new: true, runValidators: true });
  return updatedNote;
}
async function getUserNotes(userId: ObjectId) {
  const notes: Note[] = await NoteModel.find({ userId });
  return notes;
}
async function getNoteById(noteId: ObjectId, userId: ObjectId) {
  console.log(noteId, userId);
  const note = await NoteModel.findOne({ _id: noteId, userId }).exec();
  return note;
}
async function findUser(email: string) {
  const user = await NoteModel.findOne({ email });
  return user;
}
const payload = {
  addNote,
  updateNote,
  getUserNotes,
  getNoteById,
  findUser,
  removeNote,
  unComplete,
  complete,
};

export default payload;
