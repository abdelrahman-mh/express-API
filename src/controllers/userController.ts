import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';
import * as services from '../service/user.services';
import * as parseRequest from '../validate/user.validate';

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { body } = await parseRequest.createUser(req);
    const user = await services.createUser(body);

    res.status(201).json(user);
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

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (_: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await services.getUsers();
    res.status(200).json(users);
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

    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};
