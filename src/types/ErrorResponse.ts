import HttpStatusCode from './StatusCodes';

export enum ErrorTypes {
   SERVER_ERROR = 'serverError',
   INVALID_INPUT = 'invalidInput',
   INVALID_DATA = 'invalidData',
   UNAUTHORIZED = 'unauthorized',
   NOT_FOUND = 'notFound',
}


export interface ErrorFeialds {
   field: string;
   validation: string;
}

interface BaseError {
   error: ErrorTypes;
   stack?: string;
   from?: string;
   status: HttpStatusCode;
}
export interface SimpleError extends BaseError {}
export interface DetailsError extends BaseError {
   message: string;
}
export interface InputValidationError extends BaseError {
   message: string;
   data: ErrorFeialds[];
}

export type ErrorResponse = SimpleError | DetailsError | InputValidationError;
