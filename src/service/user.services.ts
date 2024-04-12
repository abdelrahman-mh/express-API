import UserModel from '../models/user.model';
import { NewUser, UpdateUser, UserDocument } from '../types/user.types';
import boom from '@hapi/boom';

export async function createUser(newUser: NewUser): Promise<UserDocument> {
  const { email } = newUser;
  const emailTaken = await UserModel.isEmailTaken(email);
  if (emailTaken) {
    throw boom.badRequest('Email already taken');
  }
  const user = await UserModel.create(newUser);
  return user;
}

export const getUserById = async (id: string): Promise<UserDocument | null> => UserModel.findById(id);

export const getUserByEmail = async (email: string): Promise<UserDocument | null> => UserModel.findOne({ email });

export const updateUserById = async (userId: string, updateBody: UpdateUser): Promise<UserDocument | null> => {
  const user = await getUserById(userId);
  if (!user) {
    throw boom.notFound('User not found!');
  }
  const updatedUser = Object.assign(user, updateBody);
  await updatedUser.save();
  return updatedUser;
};

export const deleteUserById = async (userId: string): Promise<UserDocument | null> => {
  const user = await getUserById(userId);
  if (!user) {
    throw boom.notFound('User not found!');
  }
  await user.deleteOne();
  return user;
};
