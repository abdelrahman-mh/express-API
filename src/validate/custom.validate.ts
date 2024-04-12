import { z } from 'zod';
import { isValidObjectId } from 'mongoose';

export const password = z
  .string()
  .min(8, { message: 'password must be at least 8 characters' })
  .regex(/\d/)
  .regex(/[a-zA-Z]/, { message: 'password must contain at least 1 letter and 1 number' });

export const objectId = z.string().refine((val) => isValidObjectId(val), {
  message: 'value must be a valid MongoDB ObjectId',
});
