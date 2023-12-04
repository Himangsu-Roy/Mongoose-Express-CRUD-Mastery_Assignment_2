import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

// all data fetch routes
router.post('/users', UserController.createUser);
router.get('/users', UserController.getAllUsers);
router.get('/users/:userId', UserController.getOneUserById);
router.put('/users/:userId', UserController.updateUserById);
router.delete('/users/:userId', UserController.deleteUserById);
router.put('/users/:userId/orders', UserController.addProductInOrder);
router.get('/users/:userId/orders', UserController.getAllOrdersByUserId);
router.get('/users/:userId/orders/total-price', UserController.getTotalPriceByUserId);

export const UserRoutes = router;