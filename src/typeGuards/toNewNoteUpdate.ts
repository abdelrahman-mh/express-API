import { parseBool, parseString } from './helper';
import { NewNote } from '../types/Note';

const toNewNoteUpdate = (object: unknown): Partial<NewNote> => {
   if (!object || typeof object !== 'object') {
      throw new Error(`Incorrect or missing data`);
   }

   const { title, description, complete } = object as Record<string, unknown>;

   if (title || description || complete !== undefined) {
      const newNote: Partial<NewNote> = {};

      if (title) {
         newNote.title = parseString(title, 'title');
      }

      if (description) {
         newNote.description = parseString(description, 'description');
      }

      if (complete !== undefined) {
         newNote.complete = parseBool(complete, 'complete');
      }

      if (newNote.title || newNote.description || newNote.complete !== undefined) {
         return newNote;
      }
   }

   throw new Error('Incorrect data: at least one field must have a valid value');
};

export default toNewNoteUpdate;
