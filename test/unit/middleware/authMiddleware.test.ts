import { Response } from 'express';
import authMiddleware, { AuthenticatedRequest } from '../../../src/middlewares/authMiddleware';
import { verifyToken } from '../../../src/utils/helper';
import toDecodedToken from '../../../src/typeGuards/toDecodedToken';
import { ErrorTypes } from '../../../src/types/ErrorResponse';
import { mockAuthRequest as request, mockResponse, mockNext } from '../helper';

jest.mock('../../../src/typeGuards/toDecodedToken');
jest.mock('../../../src/utils/helper', () => ({
   verifyToken: jest.fn(),
}));

const mockAuthRequest = request as unknown as jest.Mocked<AuthenticatedRequest>;
mockAuthRequest.get = jest.fn();

const mockVerifyToken = verifyToken as jest.Mock;
const mockToDecodedToken = toDecodedToken as jest.Mock;

describe('authMiddleware', () => {
   beforeEach(() => {
      mockToDecodedToken.mockReset();
      mockVerifyToken.mockReset();
   });

   it('should set user property on request object and call next() with valid token', () => {
      mockAuthRequest.get.mockReturnValue('Bearer valid-token');
      mockVerifyToken.mockReturnValue('valid-token-data');
      mockToDecodedToken.mockReturnValue({ userId: '123', username: 'testUser' });

      authMiddleware(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

      expect(mockVerifyToken).toHaveBeenCalledWith('valid-token');
      expect(mockToDecodedToken).toHaveBeenCalledWith('valid-token-data');
      expect(mockAuthRequest.user).toEqual({ userId: '123', username: 'testUser' });
      expect(mockNext).toHaveBeenCalled();
   });

   it('should return 401 if authorization header is missing', () => {
      mockAuthRequest.get.mockReturnValue(undefined);
      authMiddleware(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: ErrorTypes.UNAUTHORIZED });
      expect(mockResponse.end).toHaveBeenCalled();
      expect(mockNext).not.toHaveBeenCalled();
   });

   it('should return 401 if authorization header is invalid or does not start with bearer', () => {
      mockAuthRequest.get.mockReturnValue('InvalidToken');

      authMiddleware(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: ErrorTypes.UNAUTHORIZED });
      expect(mockResponse.end).toHaveBeenCalled();
      expect(mockNext).not.toHaveBeenCalled();
   });

   it('should call next with error if token verification fails (mockVerifyToken)', () => {
      mockAuthRequest.get.mockReturnValue('Bearer invalid-token');
      mockVerifyToken.mockImplementation(() => {
         throw new Error('Invalid Token');
      });

      authMiddleware(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

      expect(mockVerifyToken).toHaveBeenCalledWith('invalid-token');
      expect(mockNext).toHaveBeenCalledWith(new Error('Invalid Token'));
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
      expect(mockResponse.end).not.toHaveBeenCalled();
   });

   it('should call next with error if typeGuard fails (mockToDecodedToken)', () => {
      mockAuthRequest.get.mockReturnValue('Bearer valid-token');
      mockVerifyToken.mockReturnValue('valid-token-data');
      mockToDecodedToken.mockImplementation(() => {
         throw new Error('TypeGuard Failed');
      });

      authMiddleware(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

      expect(mockVerifyToken).toHaveBeenCalledWith('valid-token');
      expect(mockToDecodedToken).toHaveBeenCalledWith('valid-token-data');
      expect(mockNext).toHaveBeenCalledWith(new Error('TypeGuard Failed'));
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
      expect(mockResponse.end).not.toHaveBeenCalled();
   });
});
