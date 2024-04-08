import { Response, Request, NextFunction } from 'express';
import { Note } from '../types/Note';
import toNewNote from '../typeGuards/toNewNote';
import notesServices from '../service/noteServices';
import toNewNoteUpdate from '../typeGuards/toNewNoteUpdate';
import { ErrorTypes } from '../types/ErrorResponse';
import { paths } from '../types/schema';

const getNotes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = String(req.user.id);
  try {
    const rawNotes: Note[] = await notesServices.getUserNotes(userId);
    res.status(200).json(rawNotes);
  } catch (error) {
    next(error);
  }
};

const getNoteById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = String(req.user.id);
  try {
    const { id } = req.params;
    const note = await notesServices.getNoteById(id, userId);
    if (!note) {
      res.status(404).json({ error: ErrorTypes.NOT_FOUND });
      return;
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

const addNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = String(req.user.id);
  try {
    const noteContent = toNewNote({ ...req.body, userId });
    const newNote = await notesServices.addNote(noteContent);

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

const removeNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = String(req.user.id);
  try {
    const { id } = req.params;
    const deletedNote = await notesServices.removeNote(id, userId);

    if (!deletedNote) {
      res.status(404).json({ error: 'notFound' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const updateNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = String(req.user.id);
  try {
    const { id } = req.params;
    const update = toNewNoteUpdate(req.body);

    const updatedNote = await notesServices.updateNote(id, userId, update);

    if (!updatedNote) {
      res.status(404).json({ error: 'notFound' });
      return;
    }

    res.json(updatedNote);
  } catch (error) {
    next(error);
  }
};

const complete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = String(req.user.id);
  try {
    const { id } = req.params;
    const updatedNote = await notesServices.complete(id, userId);

    if (!updatedNote) {
      res.status(404).json({ error: 'notFound' });
      return;
    }

    res.json(updatedNote);
  } catch (error) {
    next(error);
  }
};
const unComplete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = String(req.user.id);
  try {
    const { id } = req.params;
    const updatedNote = await notesServices.unComplete(id, userId);

    if (!updatedNote) {
      res.status(404).json({ error: 'notFound' });
      return;
    }

    res.json(updatedNote);
  } catch (error) {
    next(error);
  }
};

const payload = {
  getNotes,
  getNoteById,
  addNote,
  removeNote,
  updateNote,
  complete,
  unComplete,
};

export default payload;
