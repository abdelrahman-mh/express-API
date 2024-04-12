import { z } from 'zod';
import { objectId } from './custom.validate';
import { RequestDataAsync } from '../types/main';

const NoteSchema = z.object({
  content: z.string().min(1, { message: 'This field is required!' }),
});

const UpdateNoteSchema = z.object({
  content: z.string().min(1, { message: 'This field is required!' }),
  isComplete: z.boolean(),
});

// const GetNotesQuery = z.object({
//   sortBy: z.string().optional(),
//   projectBy: z.string().optional(),
//   limit: z.number().int().optional(),
//   page: z.number().int().optional(),
// });

export const createNote = async (req: { body: unknown }): Promise<RequestDataAsync<'/notes', 'post'>> => ({
  body: await NoteSchema.parseAsync(req.body),
  params: undefined,
  query: undefined,
});

export const getNotes = async (): Promise<RequestDataAsync<'/notes', 'get'>> => ({
  body: undefined,
  params: undefined,
  query: undefined,
});

export const getNoteById = async (req: { params: { id: unknown } }): Promise<RequestDataAsync<'/notes/{id}', 'get'>> => ({
  body: undefined,
  params: { id: await objectId.parseAsync(req.params.id) },
  query: undefined,
});

export const updateNote = async (req: {
  body: unknown;
  params: { id: unknown };
}): Promise<RequestDataAsync<'/notes/{id}', 'put'>> => ({
  body: await UpdateNoteSchema.parseAsync(req.body),
  params: { id: await objectId.parseAsync(req.params.id) },
  query: undefined,
});

export const deleteNote = async (req: { params: { id: unknown } }): Promise<RequestDataAsync<'/notes/{id}', 'delete'>> => ({
  body: undefined,
  params: { id: await objectId.parseAsync(req.params.id) },
  query: undefined,
});

export const completeNote = async (req: {
  params: { id: unknown };
}): Promise<RequestDataAsync<'/notes/{id}/complete', 'post'>> => ({
  body: undefined,
  params: { id: await objectId.parseAsync(req.params.id) },
  query: undefined,
});
export const unCompleteNote = async (req: {
  params: { id: unknown };
}): Promise<RequestDataAsync<'/notes/{id}/unComplete', 'post'>> => ({
  body: undefined,
  params: { id: await objectId.parseAsync(req.params.id) },
  query: undefined,
});
