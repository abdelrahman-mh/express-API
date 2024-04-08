import mongoose from 'mongoose';
import { ErrorFeialds, ErrorTypes } from './ErrorResponse';

export enum ErrorThrowingType {
   DATA_VALIDATION = 'DataValidation',
}


export interface CustomErrorType extends Error {
   code?: number;
   error?: ErrorTypes;
   message: string;
   type?: ErrorThrowingType;
   data?: ErrorFeialds[];
}

export interface CustomMongooseError extends mongoose.Error {
   code?: number;
   index?: string;
   keyPattern?: string;
   keyValue?: string;
}
