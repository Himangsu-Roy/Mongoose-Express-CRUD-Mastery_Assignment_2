import { Request, Response } from 'express';
import { UserService } from './user.service';
import UserModel from '../../user.model';
import userSchema from './user.validation';

// create a user
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const userValidateData = userSchema.parse(user);
    const result = await UserService.createUserIntoDB(userValidateData);

    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'User not created',
      data: error,
    });
  }
};

// get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: 'All user fetched successfully',
      size: result.length,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Users not fetched',
      data: error,
    });
  }
};

// get user by id
const getOneUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const parseData = Number(userId);
    const user = await UserService.getOneUserFromDB(parseData);

    const userExists = new UserModel(user);
    if (!(await userExists.isUserExists(parseData))) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: user,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'User not found',
      data: error,
    });
  }
};

// update user by id
const updateUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const parseData = Number(userId);
    const user = req.body;
    const result = await UserService.updateUserIntoDB(parseData, user);

    const userExists = new UserModel(result);
    if (!(await userExists.isUserExists(parseData))) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'User not updated',
      data: error,
    });
  }
};

// Delete a User by Id
const deleteUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const parseData = Number(userId);
    const userExists = new UserModel();
    const existingUser = userExists.isUserExists(parseData);
    if (!(await existingUser)) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: null,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'User not deleted',
      data: error,
    });
  }
};

// add new product in order
const addProductInOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const parseData = Number(userId);
    const product = req.body;
    await UserService.addProductInOrderDB(parseData, product);

    const userExists = new UserModel();
    if (!(await userExists.isUserExists(parseData))) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Order not added',
      data: error,
    });
  }
};

// get all orders by user id
const getAllOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const parseData = Number(userId);
    const result = await UserService.getAllOrdersByUserIdDB(parseData);
    const orders = result?.orders || [];

    const userExists = new UserModel();
    if (!(await userExists.isUserExists(parseData))) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: orders,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Orders not fetched',
      data: error,
    });
  }
};

// get total price from a specific user
const getTotalPriceByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const parseData = Number(userId);
    const totalPrice = await UserService.getTotalPriceByUserIdDB(parseData);

    const userExists = new UserModel();
    if (!(await userExists.isUserExists(parseData))) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: { totalPrice },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Total price not fetched',
      data: error,
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getOneUserById,
  updateUserById,
  deleteUserById,
  addProductInOrder,
  getAllOrdersByUserId,
  getTotalPriceByUserId,
};
