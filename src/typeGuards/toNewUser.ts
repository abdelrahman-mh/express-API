import { parseString } from './helper';
import { NewUser } from '../types/User';

const toNewUser = (object: unknown): NewUser => {
   if (!object || typeof object !== 'object') {
      throw new Error('Incorrect or missing data');
   }

   const { username, email, password } = object as Record<string, unknown>;

   if (username && email && password) {
      return {
         username: parseString(username, 'username'),
         email: parseString(email, 'email'),
         password: parseString(password, 'password'),
      };
   }

   throw new Error('Incorrect data: some fields are missing');
};

export default toNewUser;
