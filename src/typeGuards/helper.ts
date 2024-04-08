import mongoose, { Types } from 'mongoose';
import { NewValidationError } from '../utils/errorsExceptions';

export const isString = (text: unknown): text is string => {
   return typeof text === 'string' || text instanceof String;
};

export const isDate = (date: unknown): date is string => {
   return isString(date) && Boolean(Date.parse(date));
};

export const isNumber = (num: unknown): num is number => typeof num === 'number' || num instanceof Number;

export const isBool = (bool: unknown): bool is boolean => typeof bool === 'boolean';

const isMongooseId = (id: unknown): id is Types.ObjectId => isString(id) && mongoose.Types.ObjectId.isValid(id);

export const parseBool = (bool: unknown, field: string): boolean => {
   if (!bool || !isBool(bool)) {
      throw NewValidationError(field);
   }
   return bool;
};

export const parseString = (str: unknown, field: string): string => {
   if (!str || !isString(str)) {
      throw NewValidationError(field);
   }
   return str;
};

export const parseNumber = (num: unknown, field: string): number => {
   if (!num || !isNumber(num)) {
      throw NewValidationError(field);
   }
   return num;
};

export const parseMongooseId = (id: unknown, field: string): Types.ObjectId => {
   if (!id || !isMongooseId(id)) {
      throw NewValidationError(field);
   }
   return new mongoose.Types.ObjectId(id);
};
