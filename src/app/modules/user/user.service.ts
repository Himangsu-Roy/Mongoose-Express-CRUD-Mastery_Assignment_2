// import { Types } from 'mongoose';
import UserModel from '../../user.model';
import { TUser } from './user.interface';

// type UserWithoutPassword = Omit<TUser, 'password'> & {
//   _id: Types.ObjectId;
// };

// create a user into DB
const createUserIntoDB = async (userData: TUser) => {
  const user = new UserModel(userData);
  if (await user.isUserExists(userData.userId)) {
    throw new Error('User already exists');
  }
  const result = await user.save();
  return result;
  // return await UserModel.create(user);

  // const userWithoutPassword: UserWithoutPassword =
  //   result.toObject() as UserWithoutPassword;

  // const { password, ...userWithoutPasswordSafe } = userWithoutPassword;

  // return userWithoutPasswordSafe;
};

// get all users from DB
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

// get single user from DB
const getOneUserFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId }, { password: 0, _id: 0 });
  return result;
};

// update a user into DB
const updateUserIntoDB = async (userId: number, userData: TUser) => {
  const result = await UserModel.updateOne({ userId }, userData);
  return result;
}

export const UserService = {
  createUserIntoDB,
  getAllUserFromDB,
  getOneUserFromDB,
  updateUserIntoDB,
};
