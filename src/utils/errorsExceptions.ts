// import mongoose from 'mongoose';
// import { CustomErrorType, CustomMongooseError, ErrorThrowingType } from '../types/Error';
// import { ErrorFeialds, ErrorTypes, InputValidationError, SimpleError } from '../types/ErrorResponse';

// export class CustomError extends Error {
//   public code?: number;
//   public error?: ErrorTypes;
//   public type?: ErrorThrowingType;
//   public data?: ErrorFeialds[];

//   constructor(errorDetails: CustomErrorType) {
//     super(errorDetails.message);

//     this.name = errorDetails.name || 'CustomError';
//     this.code = errorDetails.code;
//     this.error = errorDetails.error;
//     this.type = errorDetails.type;
//     this.data = errorDetails.data;

//     // Ensure the prototype chain is set up correctly
//     Object.setPrototypeOf(this, CustomError.prototype);
//   }

//   // Convert error to plain text
//   toObject(): CustomErrorType {
//     const { name, message, code, error, type, data } = this;
//     return { name, message, code, error, type, data };
//   }
// }

// export const NewValidationError = (field: string): CustomError => {
//   const errorResponse = new CustomError({
//     name: 'CustomError',
//     type: ErrorThrowingType.DATA_VALIDATION,
//     message: 'Incorrect Or Missing Data Fields',
//     data: [{ field, validation: 'IncorrectOrMissing' }],
//   });
//   return errorResponse;
// };

// export const CustomErrorResponse = (error: CustomErrorType) => {
//   switch (error.type) {
//     case ErrorThrowingType.DATA_VALIDATION:
//       return {
//         message: error.message,
//         error: ErrorTypes.INVALID_DATA,
//         data: error.data,
//         status: 400,
//       };
//     default:
//       return InternalServerError;
//   }
// };

// export const InternalServerError: SimpleError = {
//   error: ErrorTypes.SERVER_ERROR,
//   status: 500,
// };

// export const MongooseValidationError = (error: mongoose.Error.ValidationError): InputValidationError => {
//   const validationErrors = error.errors;
//   return {
//     error: ErrorTypes.INVALID_INPUT,
//     message: 'Validation error in input data',
//     data: Object.keys(validationErrors).map((path) => ({
//       field: path,
//       validation: validationErrors[path].kind,
//     })),
//     status: 400,
//   };
// };

// export const MongooseDuplicateKeyError = (error: CustomMongooseError): InputValidationError => {
//   // Handle duplicate key error (e.g., unique constraint violation)
//   // He will return first field founded
//   const field = Object.keys(error.keyValue || {})[0] || 'unknown';
//   return {
//     error: ErrorTypes.INVALID_INPUT,
//     message: `${field} Already exist`,
//     data: [{ field, validation: 'duplicate' }],
//     status: 409,
//   };
// };
// export const MongooseCastError = (error: mongoose.Error.CastError): InputValidationError | SimpleError => {
//   if (error.path === '_id' || error.path === 'id') {
//     return { status: 404, error: ErrorTypes.NOT_FOUND };
//   } else {
//     return {
//       error: ErrorTypes.INVALID_INPUT,
//       message: `Incorrect or missing data`,
//       data: [{ field: error.path, validation: 'duplicate' }],
//       status: 400,
//     };
//   }
// };

// export const AuthorizationError: SimpleError = {
//   status: 401,
//   error: ErrorTypes.UNAUTHORIZED,
// };
