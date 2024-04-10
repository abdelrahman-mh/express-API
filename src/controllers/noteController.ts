import { Response, Request, NextFunction } from 'express';
import { Note, ResponseData } from '../types/main';
import boom from '@hapi/boom';
import * as parseRequest from '../validate/note.validate';
import * as services from '../service/note.services';

export const addNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { body } = await parseRequest.createNote(req);
    const newNote = await services.addNote(body);
    console.log('note', newNote);
    const response: ResponseData<'/notes', 'post', 201> = {
      statusCode: 201,
      jsonContent: newNote,
    };
    res.status(response.statusCode).json(response.jsonContent);
  } catch (error) {
    next(error);
  }
};

export const removeNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { params } = await parseRequest.deleteNote({ params: { id: req.params.id } });
    const deletedNote = await services.removeNote({ noteId: params.id });
    if (!deletedNote) {
      throw boom.notFound('Note not found!');
    }

    const response: ResponseData<'/notes', 'delete', 204> = {
      jsonContent: undefined as never,
      statusCode: 204,
    };
    res.status(response.statusCode).send();
  } catch (error) {
    next(error);
  }
};

export const getNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rawNotes: Note[] = await services.getNotes();

    const response: ResponseData<'/notes', 'get', 200> = {
      jsonContent: rawNotes,
      statusCode: 200,
    };
    res.status(response.statusCode).json(rawNotes);
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { params } = await parseRequest.getNoteById({ params: { id: req.params.id } });
    const note = await services.getNoteById(params.id);
    if (!note) {
      throw boom.notFound('Note Not Found!');
    }
    const response: ResponseData<'/notes/{id}', 'get', 200> = {
      jsonContent: note,
      statusCode: 200,
    };
    res.status(response.statusCode).json(response.jsonContent);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { params, body } = await parseRequest.updateNote({ params: { id: req.params.id }, body: req.body });

    const updatedNote = await services.updateNote({ noteId: params.id, updateData: body });

    if (!updatedNote) {
      throw boom.notFound('Note not found!');
    }

    const response: ResponseData<'/notes/{id}', 'put', 200> = {
      jsonContent: updatedNote,
      statusCode: 200,
    };
    res.status(response.statusCode).json(response.jsonContent);
  } catch (error) {
    next(error);
  }
};

export const complete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { params } = await parseRequest.completeNote({ params: { id: req.params.id } });
    const updatedNote = await services.complete(params.id);

    if (!updatedNote) {
      throw boom.notFound('Not not found!');
    }
    const response: ResponseData<'/notes/{id}/complete', 'post', 200> = {
      statusCode: 200,
      jsonContent: { completed: 'Done' },
    };
    res.status(response.statusCode).json(response.jsonContent);
  } catch (error) {
    next(error);
  }
};
export const unComplete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { params } = await parseRequest.unCompleteNote({ params: { id: req.params.id } });
    const updatedNote = await services.complete(params.id);

    if (!updatedNote) {
      throw boom.notFound('Not not found!');
    }
    const response: ResponseData<'/notes/{id}/unComplete', 'post', 200> = {
      statusCode: 200,
      jsonContent: { cancel_complete: 'Done' },
    };
    res.status(response.statusCode).json(response.jsonContent);
  } catch (error) {
    next(error);
  }
};
