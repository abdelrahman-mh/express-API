import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { JsonWebTokenError, TokenExpiredError, NotBeforeError } from 'jsonwebtoken';
import ErrorHandler from '../middlewares/errorHandler';
import {
  MongooseValidationError,
  MongooseDuplicateKeyError,
  MongooseCastError,
  AuthorizationError,
  CustomErrorResponse,
  InternalServerError,
} from '../utils/errorsExceptions';
import { CustomError } from '../utils/errorsExceptions';

jest.mock('../utils/errorsExceptions'); // Mocking the utility functions

const mockRequest = {} as Request;
const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as unknown as Response;
const mockNext = jest.fn() as NextFunction;

describe('ErrorHandler Middleware', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle CustomError correctly', () => {
    const customError = new CustomError('Custom error message');
    ErrorHandler(customError, mockRequest, mockResponse, mockNext);

    expect(CustomErrorResponse).toHaveBeenCalledWith(customError);
    expect(mockResponse.status).toHaveBeenCalledWith(200); // Assuming CustomErrorResponse returns status 200
    expect(mockResponse.json).toHaveBeenCalledWith(/* expected response based on CustomErrorResponse */);
    expect(mockNext).toHaveBeenCalled();
  });

  it('should handle MongooseValidationError correctly', () => {
    const mongooseValidationError = new mongoose.Error.ValidationError();
    ErrorHandler(mongooseValidationError, mockRequest, mockResponse, mockNext);

    expect(MongooseValidationError).toHaveBeenCalledWith(mongooseValidationError);
    expect(mockResponse.status).toHaveBeenCalledWith(/* expected status based on MongooseValidationError */);
    expect(mockResponse.json).toHaveBeenCalledWith(/* expected response based on MongooseValidationError */);
    expect(mockNext).toHaveBeenCalled();
  });

  it('should handle MongooseDuplicateKeyError correctly', () => {
    const mongooseDuplicateKeyError = new mongoose.Error({ code: 11000, name: 'MongoServerError' });
    ErrorHandler(mongooseDuplicateKeyError, mockRequest, mockResponse, mockNext);

    expect(MongooseDuplicateKeyError).toHaveBeenCalledWith(mongooseDuplicateKeyError);
    expect(mockResponse.status).toHaveBeenCalledWith(/* expected status based on MongooseDuplicateKeyError */);
    expect(mockResponse.json).toHaveBeenCalledWith(/* expected response based on MongooseDuplicateKeyError */);
    expect(mockNext).toHaveBeenCalled();
  });

  it('should handle MongooseCastError correctly', () => {
    const mongooseCastError = new mongoose.Error.CastError('', 'String', 'value');
    ErrorHandler(mongooseCastError, mockRequest, mockResponse, mockNext);

    expect(MongooseCastError).toHaveBeenCalledWith(mongooseCastError);
    expect(mockResponse.status).toHaveBeenCalledWith(/* expected status based on MongooseCastError */);
    expect(mockResponse.json).toHaveBeenCalledWith(/* expected response based on MongooseCastError */);
    expect(mockNext).toHaveBeenCalled();
  });

  it('should handle JsonWebTokenError correctly', () => {
    const jsonWebTokenError = new JsonWebTokenError('JWT error message');
    ErrorHandler(jsonWebTokenError, mockRequest, mockResponse, mockNext);

    expect(AuthorizationError).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(/* expected status based on AuthorizationError */);
    expect(mockResponse.json).toHaveBeenCalledWith(/* expected response based on AuthorizationError */);
    expect(mockNext).toHaveBeenCalled();
  });

  it('should handle TokenExpiredError correctly', () => {
    const tokenExpiredError = new TokenExpiredError('JWT token expired');
    ErrorHandler(tokenExpiredError, mockRequest, mockResponse, mockNext);

    expect(AuthorizationError).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(/* expected status based on AuthorizationError */);
    expect(mockResponse.json).toHaveBeenCalledWith(/* expected response based on AuthorizationError */);
    expect(mockNext).toHaveBeenCalled();
  });

  it('should handle NotBeforeError correctly', () => {
    const notBeforeError = new NotBeforeError('JWT token not valid yet');
    ErrorHandler(notBeforeError, mockRequest, mockResponse, mockNext);

    expect(AuthorizationError).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(/* expected status based on AuthorizationError */);
    expect(mockResponse.json).toHaveBeenCalledWith(/* expected response based on AuthorizationError */);
    expect(mockNext).toHaveBeenCalled();
  });

  it('should handle other errors correctly', () => {
    const otherError = new Error('Other error message');
    ErrorHandler(otherError, mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(/* expected response for other errors */);
    expect(mockNext).toHaveBeenCalled();
  });
});
