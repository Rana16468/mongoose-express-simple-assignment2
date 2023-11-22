import { Request, Response } from "express"
import { UsersServices } from "./OrderManagement.services";
import TUserSchemaValidation from "./Order.Management.zod.validation";



const createUserController=async(req:Request,res:Response)=>{

    try{
        const users=req.body;
        const userValidtion=TUserSchemaValidation.parse(users);
        const result=await UsersServices.createUser(userValidtion);
        res.status(200).send({success:true,message:'User Create Successfully',data:result});

    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(err:any){

        res.status(500).send({success:false,message:'User not found',error:{
            code: 404,
            description: "User not found!",
            serverErrorMessage:err.message
        }})

    }
}

//retrieve All Users information controller
const All_Users_Controller=async(req:Request,res:Response)=>{

    try{

        const result=await UsersServices.retrieveAllUsers();
        res.status(200).send({
            success: true,
            message: "Users fetched successfully!",
            data:result
        })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(err:any){
        res.status(500).send({success:false,message:'User not found',error:{
            code: 404,
            description: "User not found!",
            serverErrorMessage:err.message
        }})

    }
}

// speciifc user information controller
 const  specificUser_by_ID=async(req:Request,res:Response)=>{

    try{
        const {userId}=req.params;
        const result=await UsersServices.specificUserInformation(Number(userId));
        res.status(200).send({success:true,message:"User fetched successfully!",data:result})

    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(err:any)
    {
        res.status(500).send({success:false,message:'User not found',error:{
            code: 404,
            description: "User not found!",
            serverErrorMessage:err.message
        }})
    }
 }


export const UsersControllers={
    createUserController,
    All_Users_Controller,
    specificUser_by_ID
}