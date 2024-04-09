// eslint-disable-next-line import/no-extraneous-dependencies
import { z } from 'zod';
import { RequestDataAsync } from '../types/main';
import { objectId, password } from './custom.validate';

const UserSchema = z.object({
  name: z.string().min(4, { message: 'name must be at least 4 characters long' }),
  email: z.string().email({ message: 'Invalid email' }),
  password,
});

const UpdateUserSchema = UserSchema.omit({ email: true });

const GetUsersQuery = z.object({
  name: z.string().optional(),
  role: z.string().optional(),
  sortBy: z.string().optional(),
  projectBy: z.string().optional(),
  limit: z.number().int().optional(),
  page: z.number().int().optional(),
});

export const createUser = async (req: { body: unknown }): Promise<RequestDataAsync<'/users', 'post'>> => ({
  body: await UserSchema.parseAsync(req.body),
  params: undefined,
  query: undefined,
});

export const getUsers = async (req: { query: unknown }): Promise<RequestDataAsync<'/users', 'get'>> => ({
  body: undefined,
  params: undefined,
  query: await GetUsersQuery.parseAsync(req.query),
});

export const getUser = async (req: { params: { userId: unknown } }): Promise<RequestDataAsync<'/users/{id}', 'get'>> => ({
  body: undefined,
  params: { userId: await objectId.parseAsync(req.params.userId) },
  query: undefined,
});

export const updateUser = async (req: {
  body: unknown;
  params: { userId: unknown };
}): Promise<RequestDataAsync<'/users/{id}', 'put'>> => ({
  body: await UpdateUserSchema.parseAsync(req.body),
  params: { userId: await objectId.parseAsync(req.params.userId) },
  query: undefined,
});

export const deleteUser = async (req: {
  params: { userId: unknown };
}): Promise<RequestDataAsync<'/users/{id}', 'delete'>> => ({
  body: undefined,
  params: { userId: await objectId.parseAsync(req.params.userId) },
  query: undefined,
});
