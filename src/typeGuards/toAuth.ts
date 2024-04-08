import Joi, { Schema } from 'joi';
import { parseString } from './helper';
import { SignIn, Signup } from '../types/Auth';

const toSignup = (object: unknown): Signup => {
  if (!object || typeof object !== 'object') {
    throw new Error(`Incorrect or missing data`);
  }

  const { username, password, email } = object as Record<string, unknown>;

  if (username && password && email) {
    return {
      username: parseString(username, 'username'),
      password: parseString(password, 'password'),
      email: parseString(email, 'email'),
    };
  }
  throw new Error('Incorrect data: some fields are missing');
};
const toSignIn = (object: unknown): SignIn => {
  if (!object || typeof object !== 'object') {
    throw new Error(`Incorrect or missing data`);
  }

  const { password, email } = object as Record<string, unknown>;

  if (password && email) {
    return {
      password: parseString(password, 'password'),
      email: parseString(email, 'email'),
    };
  }

  throw new Error('Incorrect data: some fields are missing');
};
const payload = {
  toSignup,
  toSignIn,
};
export default payload;

const userSchema = Joi.object({
  name: Joi.string(),
  role: Joi.string(),
  sortBy: Joi.string(),
  projectBy: Joi.string(),
  limit: Joi.number().integer(),
  page: Joi.number().integer(),
  test: Joi.string(),
});

// Extracting type from schema description
type UserSchemaType = Schema & {
  name: string | undefined;
  role: string | undefined;
  sortBy: string | undefined;
  projectBy: string | undefined;
  limit: number | undefined;
  page: number | undefined;
};

const userSchemaDescription = userSchema.describe() as unknown as UserSchemaType;

// Test
const exampleUser: UserSchemaType = {
  name: 'John',
  role: 'Admin',
  sortBy: 'name',
  limit: 10,
  page: 1,
  projectBy: 'test',
};
