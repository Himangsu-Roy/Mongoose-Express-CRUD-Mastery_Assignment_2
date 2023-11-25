import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

// all data fetch routes
router.post('/create-user', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:userId', UserController.getOneUserById);
router.put('/:userId', UserController.updateUserById);
router.delete('/:userId', UserController.deleteUserById);
router.put('/:userId/orders', UserController.addProductInOrder);
router.get('/:userId/orders', UserController.getAllOrdersByUserId);
router.get('/:userId/orders/total-price', UserController.getTotalPriceByUserId);

export const UserRoutes = router;