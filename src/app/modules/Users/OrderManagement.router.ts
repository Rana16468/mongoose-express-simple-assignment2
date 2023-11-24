import express from 'express';
import { UsersControllers } from './OrderManagement.controller';


const router=express.Router();

router.post('/',UsersControllers.createUserController);
router.get('/',UsersControllers.All_Users_Controller);
router.get('/:userId',UsersControllers.specificUser_by_ID);
router.put('/:userId',UsersControllers.Update_User_Information);
router.delete('/:userId',UsersControllers.deleteUser);
//oreder routers 
router.put('/:userId/orders',UsersControllers.product_Order);
router.get('/:userId/orders',UsersControllers.specific_User_Order);
router.get('/:userId/orders/total-price',UsersControllers.calculateTotalPrice_SpecificOrder);

export const UsersRouter=router;