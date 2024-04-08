import { parseMongooseId, parseNumber, parseString } from './helper';
import { DecodedToken } from '../types/Token';
const toDecodedToken = (object: unknown): DecodedToken => {
   if (!object || typeof object !== 'object') {
      throw new Error(`Incorrect or missing data`);
   }

   const { username, email, id, exp, iat } = object as Record<string, unknown>;

   if (username && email && id && exp && iat) {
      return {
         username: parseString(username, 'username'),
         email: parseString(email, 'email'),
         id: parseMongooseId(id, 'id'),
         exp: parseNumber(exp, 'exp'),
         iat: parseNumber(iat, 'iat'),
      };
   }

   throw new Error('Incorrect data: some fields are missing');
};

export default toDecodedToken;
