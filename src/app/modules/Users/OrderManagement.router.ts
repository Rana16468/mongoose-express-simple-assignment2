import express from 'express';
import { UsersControllers } from './OrderManagement.controller';


const router=express.Router();

router.post('/users',UsersControllers.createUserController);
router.get('/users',UsersControllers.All_Users_Controller);
router.get('/users/:userId',UsersControllers.specificUser_by_ID);
export const UsersRouter=router;