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
  const result = await UserModel.aggregate([
    {
      $project: {
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
      },
    },
  ]);
  return result; 
};

const getOneUserFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

export const UserService = {
  createUserIntoDB,
  getAllUserFromDB,
  getOneUserFromDB,
};
