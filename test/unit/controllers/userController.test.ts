import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../../../src/middlewares/authMiddleware';
import userController from '../../../src/controllers/userController';
import userServices from '../../service/user.services';
import toNewUserModule from '../../../src/typeGuards/toNewUser';
import toNewUserUpdateModule from '../../../src/typeGuards/toNewUserUpdate';
import helperModule, {
  assertErrorResponse,
  assertSuccessResponse,
  mockAuthRequest,
  mockResponse,
  mockNext,
} from '../helper';

jest.mock('../../../src/service/userServices', () => ({
  __esModule: true,
  default: {
    createUser: jest.fn(),
    updateUser: jest.fn(),
    getUsers: jest.fn(),
    getUserById: jest.fn(),
  },
}));
jest.mock('../../../src/typeGuards/toNewUser');
jest.mock('../../../src/typeGuards/toNewUserUpdate');

const mockToNewUser = toNewUserModule as jest.Mock;
const mockToNewUserUpdate = toNewUserUpdateModule as jest.Mock;

const mockCreateUser = userServices.createUser as jest.Mock;
const mockUpdateUser = userServices.updateUser as jest.Mock;
const mockGetUsers = userServices.getUsers as jest.Mock;
const mockGetUserById = userServices.getUserById as jest.Mock;

describe('User Controller - createUser', () => {
  beforeEach(() => {
    mockToNewUser.mockReset();
    mockToNewUserUpdate.mockReset();
  });
  describe('CreateUser', () => {
    it('should create a new user successfully', async () => {
      const mockUserData = helperModule.generateUserInput();
      const mockValidUser = helperModule.generateUser();

      mockToNewUser.mockReturnValue(mockUserData);
      mockCreateUser.mockResolvedValue(mockValidUser);

      await userController.createUser(mockAuthRequest as Request, mockResponse as Response, mockNext);

      assertSuccessResponse(mockResponse, mockNext, 201, mockValidUser);
    });

    it('should handle errors if typeGuards return error', async () => {
      const mockError = new Error('mock Error');
      mockToNewUser.mockImplementation(() => {
        throw mockError;
      });

      await userController.createUser(mockAuthRequest as Request, mockResponse as Response, mockNext);

      assertErrorResponse(mockResponse, mockNext, mockError);
    });

    it('should handle errors if userServices return error', async () => {
      const mockError = new Error('mock error');

      const mockUserData = helperModule.generateUserInput();
      mockToNewUser.mockReturnValue(mockUserData);
      mockCreateUser.mockRejectedValue(mockError);

      await userController.createUser(mockAuthRequest as Request, mockResponse as Response, mockNext);

      assertErrorResponse(mockResponse, mockNext, mockError);
    });
  });
  describe('UpdateUser', () => {
    mockAuthRequest.params = { id: 'example_id' };
    it('should update user successfully', async () => {
      const mockUserData = {
        username: 'John',
      };
      const mockValidUser = helperModule.generateUser();

      mockToNewUserUpdate.mockReturnValue(mockUserData);
      mockUpdateUser.mockResolvedValue(mockValidUser);

      await userController.updateUser(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

      assertSuccessResponse(mockResponse, mockNext, 200, mockValidUser);
    });

    it('should handle errors if typeGuards return error', async () => {
      const mockError = new Error('mock error');
      mockToNewUserUpdate.mockImplementation(() => {
        throw mockError;
      });

      await userController.updateUser(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

      assertErrorResponse(mockResponse, mockNext, mockError);
    });

    it('should handle errors if userServices return null', async () => {
      const mockUserData = helperModule.generateUserInput();
      mockToNewUserUpdate.mockReturnValue(mockUserData);
      mockUpdateUser.mockReturnValue(null);

      await userController.updateUser(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

      assertSuccessResponse(mockResponse, mockNext, 404, { error: 'notFound' });
    });
  });
  describe('GetUsers', () => {
    it('should get users successfully', async () => {
      const users = [helperModule.generateUserInput()];
      mockGetUsers.mockResolvedValue(users);

      await userController.getUsers(mockAuthRequest as Request, mockResponse as Response, mockNext);

      assertSuccessResponse(mockResponse, mockNext, 200, users);
    });
    it('should handle errors if userServices return error', async () => {
      const mockError = new Error('mock error');
      mockGetUsers.mockRejectedValue(mockError);

      await userController.getUsers(mockAuthRequest as Request, mockResponse as Response, mockNext);

      assertErrorResponse(mockResponse, mockNext, mockError);
    });
  });
  describe('GetUser', () => {
    mockAuthRequest.params = { id: 'example_id' };
    it('should get user if he exist', async () => {
      const user = helperModule.generateUser();
      mockGetUserById.mockResolvedValue(user);

      await userController.getUser(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

      assertSuccessResponse(mockResponse, mockNext, 200, user);
    });
    it('should handle error if user not found', async () => {
      mockGetUserById.mockResolvedValue(null);

      await userController.getUser(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

      assertSuccessResponse(mockResponse, mockNext, 401, { error: 'notFound' });
    });
    it('should handle error from userServices', async () => {
      const mockError = new Error('Mock Error');
      mockGetUserById.mockRejectedValue(mockError);

      await userController.getUser(mockAuthRequest as AuthenticatedRequest, mockResponse as Response, mockNext);

      assertErrorResponse(mockResponse, mockNext, mockError);
    });
  });
});
