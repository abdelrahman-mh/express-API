import Joi from 'joi';

export const userValidator = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    'string.base': 'Username must be a string',
    'string.empty': 'Username is required',
    'string.min': 'Username must have at least {#limit} characters',
    'string.max': 'Username cannot exceed {#limit} characters',
    'any.required': 'Username is required',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email address',
    'string.empty': 'Email is required',
    'any.required': 'Email is required',
  }),
  password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')).required().messages({
    'string.base': 'Password must be a string',
    'string.pattern.base': 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number',
    'string.empty': 'Password is required',
    'any.required': 'Password is required',
  }),
}).options({ stripUnknown: true, abortEarly: false }); // abortEarly for return all field errors - stripUnknown for make it not process unknown data

export const updateUserValidator = Joi.object({
  password: userValidator.extract('title'),
}).options({ stripUnknown: true, abortEarly: false });
