import { Response, NextFunction, Request } from 'express';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { Note } from '../../src/types/Note';
import { Types } from 'mongoose';
import { DecodedToken } from '../../src/types/Token';
// types
type UserInput = {
   username: string;
   email: string;
   password: string;
};
interface UserOutput extends Omit<UserInput, 'password'> {
   id: Types.ObjectId;
}

// Mocked Functions
const mongooseId = () => new Types.ObjectId('a1'.repeat(12));
const generateAuthUser = (payload?: Partial<DecodedToken>): DecodedToken => ({
   username: payload?.username || 'John Doe',
   email: payload?.email || 'john.doe@example.com',
   id: mongooseId(),
   iat: payload?.iat || 1234567,
   exp: payload?.exp || 12345667,
});

interface MockRequest extends Partial<Request> {
   params: { id: string };
   body: any;
}
interface MockAuthRequest extends Partial<AuthenticatedRequest> {
   user: DecodedToken;
   params?: { id: string };
}
export const mockRequest: MockRequest = { params: { id: 'test' }, body: {} };
export const mockAuthRequest: MockAuthRequest = {
   user: generateAuthUser(),
   params: { id: 'test' },
   get: jest.fn(),
};
export const mockResponse: Partial<Response> = {
   json: jest.fn().mockReturnThis(),
   status: jest.fn().mockReturnThis(),
   send: jest.fn(),
   end: jest.fn(),
};
export const mockNext: NextFunction = jest.fn();

const generateNote = (payload?: Partial<Note>): Note => ({
   id: mongooseId(),
   title: payload?.title || 'Default Title',
   complete: payload?.complete || Math.random() > 0.5,
   userId: mongooseId(),
});

const generateUserInput = (payload?: UserInput): UserInput => ({
   username: payload?.username || 'John Doe',
   email: payload?.email || 'john.doe@example.com',
   password: 'test123',
});
const generateUser = (payload?: Partial<UserOutput>): UserOutput => ({
   // generate user like ->  from data base
   username: payload?.username || 'John Doe',
   email: payload?.email || 'john.doe@example.com',
   id: mongooseId(),
});

export const assertSuccessResponse = (mockResponse: Partial<Response>, mockNext: NextFunction, status: number, data: any) => {
   expect(mockResponse.status).toHaveBeenCalledWith(status);
   expect(mockResponse.json).toHaveBeenCalledWith(data);
   expect(mockNext).not.toHaveBeenCalled();
};

export const assertErrorResponse = (mockResponse: Partial<Response>, mockNext: NextFunction, error: any) => {
   expect(mockNext).toHaveBeenCalledWith(error);
   expect(mockResponse.json).not.toHaveBeenCalled();
   expect(mockResponse.status).not.toHaveBeenCalled();
};

const payload = {
   generateNote,
   mongooseId,
   generateAuthUser,
   generateUser,
   generateUserInput,
};

export default payload;
