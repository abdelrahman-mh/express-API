import { parseMongooseId, parseString } from './helper';
import { NewNote } from '../types/Note';

const toNewNote = (object: unknown): NewNote => {
   if (!object || typeof object !== 'object') {
      throw new Error(`Incorrect or missing data`);
   }

   const { title, description, complete, userId } = object as Record<string, unknown>;

   if (title) {
      return {
         title: parseString(title, 'title'),
         description: description ? parseString(description, 'description') : undefined,
         complete: complete !== undefined ? Boolean(complete) : false,
         userId: parseMongooseId(userId, 'id')
      };
   }

   throw new Error('Incorrect data: some fields are missing');
};

export default toNewNote;
