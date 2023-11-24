import { Request, Response } from 'express';
import { UserService } from './user.service';
import UserModel from '../../user.model';
import userSchema from './user.validation';

// create a user
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const userValidateData = userSchema.parse(user)
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
}

// Delete a User by Id

const deleteUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const parseData = Number(userId);
    const result = await UserService.deleteUserFromDB(parseData);


    // const userExists = new UserModel(result);
    if (result.matchedCount === 0) {
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
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'User not deleted',
      data: error,
    });
  }
}

export const UserController = {
  createUser,
  getAllUsers,
  getOneUserById,
  updateUserById,
  deleteUserById,
};
