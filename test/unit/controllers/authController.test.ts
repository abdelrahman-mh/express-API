import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import userServices from '../../service/user.services';
import { generateAuthToken } from '../../../src/utils/helper';
import authController from '../../../src/controllers/authenticationController';
import toAuth from '../../../src/typeGuards/toAuth';
import { parseMongooseId } from '../../../src/typeGuards/helper';
import { mockRequest, mockResponse, mockNext } from '../helper';

jest.mock('../../../src/service/userServices');
jest.mock('../../../src/utils/helper', () => ({
  generateAuthToken: jest.fn(),
}));
jest.mock('../../../src/typeGuards/helper', () => ({
  parseMongooseId: jest.fn(),
}));
jest.mock('../../../src/typeGuards/toAuth');
jest.mock('bcrypt');

describe('Auth Controller', () => {
  beforeEach(() => {
    (toAuth.toSignIn as jest.Mock).mockReset();
    (toAuth.toSignup as jest.Mock).mockReset();
  });

  describe('signup', () => {
    it('should create a new user and return it in the response', async () => {
      const mockPayload = { email: 'test@example.com', password: 'test123' };
      (toAuth.toSignup as jest.Mock).mockReturnValue(mockPayload);
      (userServices.createUser as jest.Mock).mockResolvedValue({ email: mockPayload.email });

      await authController.signup(mockRequest as Request, mockResponse as Response, mockNext);

      expect(toAuth.toSignup).toHaveBeenCalledWith(mockRequest.body);
      expect(userServices.createUser).toHaveBeenCalledWith(mockPayload);
      expect(mockResponse.json).toHaveBeenCalledWith({ user: { email: mockPayload.email } });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call the next function with an error if type guard fails', async () => {
      const mockError = new Error('Type guard failed');
      (toAuth.toSignup as jest.Mock).mockImplementation(() => {
        throw mockError;
      });

      await authController.signup(mockRequest as Request, mockResponse as Response, mockNext);

      expect(toAuth.toSignup).toHaveBeenCalledWith(mockRequest.body);
      expect(userServices.createUser).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });

    it('should call the next function with an error if userServices throws an error', async () => {
      const mockError = new Error('UserServices error');
      (toAuth.toSignup as jest.Mock).mockReturnValue({});
      (userServices.createUser as jest.Mock).mockRejectedValue(mockError);

      await authController.signup(mockRequest as Request, mockResponse as Response, mockNext);

      expect(toAuth.toSignup).toHaveBeenCalledWith(mockRequest.body);
      expect(userServices.createUser).toHaveBeenCalledWith({});
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('signIn', () => {
    it('should sign in the user and return a token and user in the response', async () => {
      const signInRequest: Request = { body: { email: 'test@example.com', password: 'test123' } } as Request;
      const mockUser = {
        email: 'test@example.com',
        password: 'hashedPassword',
        username: 'test',
        id: 'example_id',
      };

      (toAuth.toSignIn as jest.Mock).mockReturnValue(signInRequest.body);
      (userServices.findUser as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (generateAuthToken as jest.Mock).mockReturnValue('mockToken');
      (parseMongooseId as jest.Mock).mockReturnValue('mockUserId');
      await authController.signIn(signInRequest, mockResponse as Response, mockNext);

      expect(bcrypt.compare).toHaveBeenCalledWith(signInRequest.body.password, mockUser.password);
      expect(generateAuthToken).toHaveBeenCalledWith(
        expect.objectContaining({
          username: mockUser.username,
          email: mockUser.email,
          id: 'mockUserId',
        }),
      );

      expect(mockResponse.json).toHaveBeenCalledWith({ token: 'mockToken', user: mockUser });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 401 if credentials are invalid', async () => {
      const signInRequest: Request = { body: { email: 'test@example.com', password: 'invalidPassword' } } as Request;
      const mockUser = {
        email: 'test@example.com',
        password: 'hashedPassword',
        username: 'test',
        id: 'example_id',
      };

      (toAuth.toSignIn as jest.Mock).mockReturnValue(signInRequest.body);
      (userServices.findUser as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await authController.signIn(signInRequest, mockResponse as Response, mockNext);

      expect(bcrypt.compare).toHaveBeenCalledWith(signInRequest.body.password, mockUser.password);
      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call the next function with an error if type guard fails', async () => {
      const mockError = new Error('Type guard failed');
      (toAuth.toSignIn as jest.Mock).mockImplementation(() => {
        throw mockError;
      });

      await authController.signIn(mockRequest as Request, mockResponse as Response, mockNext);

      expect(toAuth.toSignIn).toHaveBeenCalledWith(mockRequest.body);
      expect(userServices.findUser).not.toHaveBeenCalled();
      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(generateAuthToken).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });

    it('should call the next function with an error if userServices throws an error', async () => {
      const payload = { email: 'test@example.com' };
      (toAuth.toSignIn as jest.Mock).mockReturnValue(payload);
      const mockError = new Error('UserServices error');
      (userServices.findUser as jest.Mock).mockRejectedValue(mockError);

      await authController.signIn(mockRequest as Request, mockResponse as Response, mockNext);

      expect(toAuth.toSignIn).toHaveBeenCalledWith(mockRequest.body);
      expect(userServices.findUser).toHaveBeenCalledWith(payload.email);
      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(generateAuthToken).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });

    it('should call the next function with an error if bcrypt.compare fails', async () => {
      const mockPayload = { email: 'test@example.com', password: 'test123' };
      const mockUser = {
        ...mockPayload,
        username: 'test',
        password: 'hashedPassword',
        id: 'example_id',
      };

      (toAuth.toSignIn as jest.Mock).mockReturnValue(mockPayload);
      (userServices.findUser as jest.Mock).mockResolvedValue(mockUser);
      const mockError = new Error('Bcrypt compare error');
      (bcrypt.compare as jest.Mock).mockRejectedValue(mockError);

      await authController.signIn(mockRequest as Request, mockResponse as Response, mockNext);

      expect(toAuth.toSignIn).toHaveBeenCalledWith(mockRequest.body);
      expect(userServices.findUser).toHaveBeenCalledWith(mockPayload.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(mockPayload.password, mockUser.password);
      expect(generateAuthToken).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});
