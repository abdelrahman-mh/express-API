import Joi, { CustomHelpers, LanguageMessages } from 'joi';
import { isValidObjectId } from 'mongoose';

export const noteValidator = Joi.object({
  title: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Title must be a string',
    'string.empty': 'Title is required',
    'string.min': 'Title must have at least {#limit} characters',
    'string.max': 'Title cannot exceed {#limit} characters',
    'any.required': 'Title is required',
  }),
  description: Joi.string().max(500).required().messages({
    'string.base': 'Description must be a string',
    'string.empty': 'Description is required',
    'string.max': 'Description cannot exceed {#limit} characters',
    'any.required': 'Description is required',
  }),
  complete: Joi.boolean().required().messages({
    'boolean.base': 'Complete must be a boolean value',
    'any.required': 'Complete status is required',
  }),
  userId: Joi.string()
    .custom((value: string, helpers: CustomHelpers) => {
      if (!isValidObjectId(value)) {
        return helpers.message(<LanguageMessages>{
          custom: 'Not Found!',
        });
      }
      return value;
    })
    .required()
    .messages({
      'string.base': 'User ID must be a string',
      'string.empty': 'User ID is required',
      'any.required': 'User ID is required',
    }),
}).options({ stripUnknown: true, abortEarly: false });

// not extends userId
export const noteUpdateValidate = Joi.object({
  title: noteValidator.extract('title').optional(),
  description: noteValidator.extract('description').optional(),
  complete: noteValidator.extract('complete').optional(),
}).options({ stripUnknown: true, abortEarly: false });
