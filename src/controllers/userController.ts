import { NextFunction, Request, Response } from 'express';
import { ResponseData } from '../types/main';
import boom from '@hapi/boom';
import * as services from '../service/user.services';
import * as parseRequest from '../validate/user.validate';

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { body } = await parseRequest.createUser(req);
    const user = await services.createUser(body);

    const response: ResponseData<'/users', 'post', 201> = {
      statusCode: 201,
      jsonContent: user,
    };
    res.status(response.statusCode).json(response.jsonContent);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { params, body } = await parseRequest.updateUser({ params: { userId: req.params.id }, body: req.body });
    const updatedUser = await services.updateUser({ userId: params.userId, updateData: body });

    if (!updatedUser) {
      throw boom.notFound('User not found!');
    }

    const response: ResponseData<'/users/{id}', 'put', 200> = {
      statusCode: 200,
      jsonContent: updatedUser,
    };

    res.status(response.statusCode).json(response.jsonContent);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (_: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await services.getUsers();
    const response: ResponseData<'/users', 'get', 200> = {
      statusCode: 200,
      jsonContent: users,
    };
    res.status(response.statusCode).json(response.jsonContent);
  } catch (error) {
    next(error);
  }
};
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { params } = await parseRequest.getUser({ params: { userId: req.params.id } });
    const user = await services.getUserById(params.userId);
    if (!user) {
      throw boom.notFound('User not found!');
    }

    const response: ResponseData<'/users/{id}', 'get', 200> = {
      statusCode: 200,
      jsonContent: user,
    };
    return res.status(response.statusCode).json(response.jsonContent);
  } catch (error) {
    return next(error);
  }
};
