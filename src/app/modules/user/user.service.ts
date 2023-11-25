import UserModel from '../../user.model';
import { TUser } from './user.interface';

// create a user into DB
const createUserIntoDB = async (userData: TUser) => {
  const user = new UserModel(userData);

  if (await user.isUserExists(userData.userId)) {
    throw new Error('User already exists');
  }

  const result = await user.save();
  const project = {
    userId: 1,
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
    _id: 0,
  };

  // Fetch the saved user data with the specified project
  const savedUser = await UserModel.findById(result._id, project);
  return savedUser;
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
};

// delete a user from DB
const deleteUserFromDB = async (userId: number) => {
  const result = await UserModel.updateOne({ userId }, { isDeleted: true });
  return result;
};

// add product in order DB
const addProductInOrderDB = async (userId: number, product: any) => {
  const result = await UserModel.updateOne(
    { userId },
    {
      $push: {
        orders: {
          productName: product.productName,
          price: product.price,
          quantity: product.quantity,
        },
      },
    },
  );

  return result;
};


// get all orders from DB
const getAllOrdersByUserIdDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId }, { orders: 1 });
  return result;
};


// get total price from DB orders by user id
const getTotalPriceByUserIdDB = async (userId: number) => {
  const result = await UserModel.aggregate([
    { $match: { userId } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalPrice: 1,
      },
    },
  ]);
  
  const totalPrice = result.length > 0 ? result[0].totalPrice : 0;
  return totalPrice;
};

export const UserService = {
  createUserIntoDB,
  getAllUserFromDB,
  getOneUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
  addProductInOrderDB,
  getAllOrdersByUserIdDB,
  getTotalPriceByUserIdDB,
};
