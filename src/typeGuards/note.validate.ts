import Joi from 'joi';
import { NewUser, UpdateUser, RequestData } from '../types/main';
import { objectId, password } from './custom.validate';

interface GetUsersQuery {
  name?: string;
  role?: string;
  sortBy?: string;
  limit?: number;
  page?: number;
}

// Define common schemas
const userIdSchema = Joi.string().custom(objectId);
const nameSchema = Joi.string();
const emailSchema = Joi.string().required().email();
const passwordSchema = Joi.string().required();
const sortBySchema = Joi.string();
const limitSchema = Joi.number().integer();
const pageSchema = Joi.number().integer();

// Define request schemas
const createUserBody = {
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema,
};

const getUsersQuery = {
  name: nameSchema,
  role: nameSchema,
  sortBy: sortBySchema,
  projectBy: sortBySchema,
  limit: limitSchema,
  page: pageSchema,
};

// Define request data
export const createUser: RequestData<'/users', 'post'> = {
  body: Joi.object().keys(createUserBody) as NewUser,
  params: undefined,
  query: undefined,
};

export const getUsers: RequestData<'/users', 'get'> = {
  body: undefined,
  params: undefined,
  query: Joi.object().keys(getUsersQuery) as GetUsersQuery,
};

export const getUser: RequestData<'/users/{id}', 'get'> = {
  body: undefined,
  params: { userId: userIdSchema },
  query: undefined,
};

export const updateUser: RequestData<'/users/{id}', 'put'> = {
  body: Joi.object({
    password: passwordSchema.custom(password),
    name: nameSchema,
  }).min(1) as UpdateUser,
  params: { userId: userIdSchema.required() },
  query: undefined,
};

export const deleteUser: RequestData<'/users/{id}', 'delete'> = {
  body: undefined,
  params: { userId: userIdSchema },
  query: undefined,
};
