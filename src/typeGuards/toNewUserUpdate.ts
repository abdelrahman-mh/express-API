import { parseString } from './helper';
import { NewUser } from '../types/User';

const toNewUser = (object: unknown): Partial<NewUser> => {
   if (!object || typeof object !== 'object') {
      throw new Error('Incorrect or missing data');
   }

   const { username, email, password } = object as Record<string, unknown>;

   if (username || email || password) {
      const newUser: Partial<NewUser> = {};

      if (username) {
         newUser.username = parseString(username, 'username');
      }

      if (email) {
         newUser.email = parseString(email, 'email');
      }

      if (password) {
         newUser.password = parseString(password, 'password');
      }

      if (newUser.username || newUser.email || newUser.password) {
         return newUser;
      }
   }

   throw new Error('Incorrect data: at least one field must have a valid value');
};

export default toNewUser;
