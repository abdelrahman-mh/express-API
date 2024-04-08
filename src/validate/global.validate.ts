import Joi, { CustomHelpers, LanguageMessages } from 'joi';
import { isValidObjectId } from 'mongoose';

export const objectId = Joi.custom((value: string, helpers: CustomHelpers) => {
  if (!isValidObjectId(value)) {
    return helpers.message(<LanguageMessages>{
      custom: 'Not Found!',
    });
  }
  return value;
});
