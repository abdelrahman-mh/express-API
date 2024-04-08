import UserModel from '../models/User';
import { NewUser } from '../types/main';

async function createUser(body: unknown) {
  const user = new UserModel(body);
  await user.save();
  return user;
}

async function updateUser(userId: string, userData: Partial<NewUser>) {
  const updatedUser = await UserModel.findByIdAndUpdate(userId, userData, { new: true });
  return updatedUser;
}
async function getUsers() {
  const users = await UserModel.find({});
  return users;
}
async function getUserById(userId: string) {
  const user = await UserModel.findById(userId);
  return user;
}
async function findUser(email: string) {
  const user = await UserModel.findOne({ email });
  return user;
}
const payload = {
  createUser,
  updateUser,
  getUsers,
  getUserById,
  findUser,
};

export default payload;
