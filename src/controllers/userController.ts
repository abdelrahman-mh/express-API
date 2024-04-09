import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import toNewUser from '../typeGuards/toNewUser';
// import toNewUserUpdate from '../typeGuards/toNewUserUpdate';
import { ValidUser } from '../types/User';
import userServices from '../service/user.services';
// import { AuthenticatedRequest } from '../middlewares/authMiddleware';

const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userData = toNewUser(req.body);
    const user = await userServices.createUser(userData);

    const validUser: ValidUser = {
      username: user.username,
      email: user.email,
      id: user.id as Types.ObjectId,
    };

    res.status(201).json(validUser);
  } catch (error) {
    next(error);
  }
};

// const updateUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
//   const userId = String(req.user.id);
//   try {
//     const userData = toNewUserUpdate(req.body);

//     const updatedUser = await userServices.updateUser(userId, userData); // this will return `null` if not found user!

//     if (!updatedUser) {
//       res.status(404).json({ error: 'notFound' });
//       return;
//     }

//     const validUser: ValidUser = {
//       username: updatedUser.username,
//       email: updatedUser.email,
//       id: updatedUser.id as Types.ObjectId,
//     };

//     res.status(200).json(validUser);
//   } catch (error) {
//     next(error);
//   }
// };

// const getUsers = async (_: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const users = await userServices.getUsers();
//     res.status(200).json(users);
//   } catch (error) {
//     next(error);
//   }
// };
// const getUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//   const userId = String(req.user.id);
//   try {
//     const user = await userServices.getUserById(userId);
//     if (!user) {
//       return res.status(401).json({ error: 'notFound' });
//     }
//     return res.status(200).json(user);
//   } catch (error) {
//     return next(error);
//   }
// };
const payload = { createUser };
export default payload;
