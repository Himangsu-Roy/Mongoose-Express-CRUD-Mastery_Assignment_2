import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/create-user', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:userId', UserController.getOneUserById);
router.put('/:userId', UserController.updateUserById);
router.delete('/:userId', UserController.deleteUserById);

export const UserRoutes = router;