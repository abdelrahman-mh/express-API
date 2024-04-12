import { NextFunction, Request, Response } from 'express';
// import mongoose from 'mongoose';
// import { JsonWebTokenError, TokenExpiredError, NotBeforeError } from 'jsonwebtoken';

// import { log } from '../utils/logger';
// import { ErrorResponse, ErrorTypes, SimpleError } from '../types/ErrorResponse';
// import { CustomErrorType, CustomMongooseError } from '../types/Error';
// import { CustomError } from '../utils/errorsExceptions';
// import { AuthorizationError, CustomErrorResponse, InternalServerError, MongooseCastError, MongooseDuplicateKeyError, MongooseValidationError } from '../utils/errorsExceptions';

// import { components } from '../types/schema';

// // Dynamically generates all error types based on the keys in the OpenAPI components' responses Errors
// type Errors = {
//   [K in keyof components['responses']]: K;
// };

// // error types provides
// enum MongooseValidation  {
//    [keyof Errors["BadRequest"]] = Errors["BadRequest"];
//    [keyof Errors["ConflictError"]] = Errors["ConflictError"];
// }

// let handleMongooseValidationError;
// let handleMongooseDuplicateKeyError;
// let handleMongooseCastError;

// const handleMongooseError = (err: CustomMongooseError): ErrorResponse => {
//   log('Handling Mongoose Error:', err.message);
//   let errorResponse: ErrorResponse;

//   if (err instanceof mongoose.Error.ValidationError) {
//     errorResponse = MongooseValidationError(err);
//   } else if (err.code === 11000 && err.name === 'MongoServerError') {
//     errorResponse = MongooseDuplicateKeyError(err);
//   } else if (err instanceof mongoose.Error.CastError) {
//     errorResponse = MongooseCastError(err);
//   } else {
//     errorResponse = InternalServerError;
//   }

//   if (isDevEnvironment) {
//     errorResponse.from = 'Mongoose error';
//   }

//   return errorResponse;
// };

// const handleJwtError = (err: JsonWebTokenError | TokenExpiredError | NotBeforeError): SimpleError => {
//   log('Handling JWT Error:', err.message);
//   return AuthorizationError;
// };

const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction): void => {
  // let errorResponse: ErrorResponse;

  // if (err instanceof CustomError) {
  //   errorResponse = CustomErrorResponse(err);
  // } else if (err instanceof mongoose.Error || (err.code === 11000 && err.name === 'MongoServerError')) {
  //   errorResponse = handleMongooseError(err);
  // } else if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError || err instanceof NotBeforeError) {
  //   errorResponse = handleJwtError(err);
  // } else {
  //   errorResponse = { status: 400, error: ErrorTypes.INVALID_DATA, message: err.message };
  // }

  // if (isDevEnvironment) {
  //   errorResponse.stack = err instanceof Error ? err.stack : '';
  // }

  res.status(400).json(err);
  next();
};

export default errorHandler;
