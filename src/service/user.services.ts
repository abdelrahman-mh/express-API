import UserModel from '../models/User';
import { NewUser, User , UserDocument} from '../types/main';

export async function createUser(newUser: NewUser): Promise<UserDocument> {
  const user = new UserModel(newUser);
  await user.save();
  return user;
}

export async function updateUser({ userId, updateData }: { userId: string; updateData: Partial<NewUser> }) {
  const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData);
  return updatedUser;
}
export async function getUsers() {
  const users = await UserModel.find({});
  return users;
}
export async function getUserById(userId: string) {
  const user = await UserModel.findById(userId);
  return user;
}
export async function findUser(email: string) {
  const user = await UserModel.findOne({ email });
  return user;
}
