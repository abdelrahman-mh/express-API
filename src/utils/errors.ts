import { components } from '../types/schema';

type ErrorResponse = {
  error: string;
  message: string;
  details: components['schemas']['DetailsError'];
};

type ErrorsTypes = {
  [K in keyof components['responses']]: K;
};

const errors: ErrorsTypes = {
  BadRequest: 'BadRequest',
  AuthenticationError: 'AuthenticationError',
  AuthorizationError: 'AuthorizationError',
  ConflictError: 'ConflictError',
  ResourceNotFoundError: 'ResourceNotFoundError',
  InternalServerError: 'InternalServerError',
  RateLimitExceededError: 'RateLimitExceededError',
  MaintenanceModeError: 'MaintenanceModeError',
};

export abstract class CustomError extends Error {
  abstract readonly statusCode: number;
  abstract readonly errorResponse: ErrorResponse;
  abstract readonly logging: boolean;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default class BadRequestError extends CustomError {
  private static readonly _statusCode = 400;
  private readonly _code: number = BadRequestError._statusCode;
  private readonly _logging: boolean = false;
  private readonly _details: components['schemas']['DetailsError'];

  constructor({ code = BadRequestError._statusCode, message = 'Bad request', logging = false, details }: { code?: number; message?: string; logging?: boolean; details: components['schemas']['DetailsError'] }) {
    super(message);
    this._code = code;
    this._logging = logging;
    this._details = details;
  }

  get errorResponse(): ErrorResponse {
    return { error: errors.BadRequest, message: this.message, details: this._details };
  }

  get statusCode(): number {
    return this._code;
  }

  get logging(): boolean {
    return this._logging;
  }
}

// type components = {
//   schema: unknown;
//   responses: {
//     BadRequest: { headers: unknown; content: { 'application/json': string; 'html/text': string } };
//     AuthenticationError: { headers: unknown; content: { 'application/json': string; 'html/text': string } };
//     AuthorizationError: { headers: unknown; content: { 'application/json': string; 'html/text': string } };

//   };
// };
//------------------------------------------------------
// Error spec
//------------------------------------------------------
class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError extends BaseError {
  readonly error: string;

  constructor(message: string) {
    super(message);
    this.error = 'Bad request';
  }
}

class AuthenticationError extends BaseError {
  readonly error: string;

  constructor(message: string) {
    super(message);
    this.error = 'Authentication failed. Please check your credentials.';
  }
}

class ResourceNotFoundError extends BaseError {
  readonly error: string;
  readonly resource: string;
  readonly identifier: string;

  constructor(message: string, resource: string, identifier: string) {
    super(message);
    this.error = 'The requested resource was not found.';
    this.resource = resource;
    this.identifier = identifier;
  }
}

class InternalServerError extends BaseError {
  readonly error: string;
  readonly code: string;
  readonly details?: string;

  constructor(message: string, code: string, details?: string) {
    super(message);
    this.error = 'An unexpected error occurred on the server.';
    this.code = code;
    this.details = details;
  }
}

class ConflictError extends BaseError {
  readonly error: string;
  readonly message: string;

  constructor(message: string) {
    super(message);
    this.error = 'Conflict';
    this.message = 'A user with the provided email already exists in the database.';
  }
}
