import express from 'express';
import { UsersControllers } from './OrderManagement.controller';


const router=express.Router();

router.post('/users',UsersControllers.createUserController);
router.get('/users',UsersControllers.All_Users_Controller);
router.get('/users/:userId',UsersControllers.specificUser_by_ID);
router.put('/users/:userId',UsersControllers.Update_User_Information);
router.delete('/users/:userId',UsersControllers.deleteUser);
//oreder router 
router.put('/users/:userId/orders',UsersControllers.product_Order);
router.get('/users/:userId/orders',UsersControllers.specific_User_Order);
router.get('/users/:userId/orders/total-price',UsersControllers.calculateTotalPrice_SpecificOrder);

export const UsersRouter=router;