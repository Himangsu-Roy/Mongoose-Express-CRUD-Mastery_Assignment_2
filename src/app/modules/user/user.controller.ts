import { Request, Response } from 'express';
import { UserService } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await UserService.createUserIntoDB(user);
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

const getOneUserById = async (req: Request, res: Response) => {
  try {
    const userID = req.params.userId;
    const result = await UserService.getOneUserFromDB(Number(userID));
    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'User not fetched',
      data: error,
    });
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getOneUserById,
};
