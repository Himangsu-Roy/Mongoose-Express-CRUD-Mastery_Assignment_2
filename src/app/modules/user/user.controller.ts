import { Request, Response } from 'express';
import { UserService } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await UserService.createUser(user);
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Student not created',
      data: error,
    });
  }
};

export const UserController = {
  createUser,
};
