import UserModel from '../../user.model';
import { TUser } from './user.interface';

const createUser = async (userData: TUser) => {
  const user = new UserModel(userData);
  if (await user.isUserExists(userData.userId)) {
    throw new Error('User already exists');
  }
  const result = await user.save();
  return result;
  // return await UserModel.create(user);
};

export const UserService = {
  createUser,
};
