import { Response, Request, NextFunction } from 'express';
// import { Note } from '../types/main';
import boom from '@hapi/boom';
import * as parseRequest from '../validate/note.validate';
import * as services from '../service/note.services';

export const addNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { body } = await parseRequest.createNote(req);
    const newNote = await services.addNote(body);

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

export const removeNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { params } = await parseRequest.deleteNote({
      params: { id: req.params.id },
    });
    const deletedNote = await services.removeNote({ noteId: params.id });
    if (!deletedNote) {
      throw boom.notFound('Note not found!');
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rawNotes = await services.getNotes();
    console.log(rawNotes);
    res.status(200).json(rawNotes);
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { params } = await parseRequest.getNoteById({
      params: { id: req.params.id },
    });
    const note = await services.getNoteById(params.id);
    if (!note) {
      throw boom.notFound('Note Not Found!');
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { params, body } = await parseRequest.updateNote({
      params: { id: req.params.id },
      body: req.body,
    });

    const updatedNote = await services.updateNote({
      noteId: params.id,
      updateData: body,
    });

    if (!updatedNote) {
      throw boom.notFound('Note not found!');
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const complete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { params } = await parseRequest.completeNote({
      params: { id: req.params.id },
    });
    const updatedNote = await services.complete(params.id);

    if (!updatedNote) {
      throw boom.notFound('Not not found!');
    }
    res.status(200).json({ completed: 'Done' });
  } catch (error) {
    next(error);
  }
};
export const unComplete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { params } = await parseRequest.unCompleteNote({
      params: { id: req.params.id },
    });
    const updatedNote = await services.complete(params.id);

    if (!updatedNote) {
      throw boom.notFound('Not not found!');
    }
    res.status(200).json({ cancel_complete: 'Done' });
  } catch (error) {
    next(error);
  }
};
