import UserModel from '../../user.model';
import { TUser } from './user.interface';

const createUserIntoDB = async (userData: TUser) => {
  const user = new UserModel(userData);
  if (await user.isUserExists(userData.userId)) {
    throw new Error('User already exists');
  }
  const result = await user.save();
  return result;
  // return await UserModel.create(user);
};


const getAllUserFromDB = async () => {
  const result = await UserModel.find();
  return result;
}

export const UserService = {
  createUserIntoDB,
  getAllUserFromDB,
};
