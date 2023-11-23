
import { Request, Response } from "express"
import { UsersServices } from "./OrderManagement.services";
import TUserSchemaValidation, { TOrdersValidation } from "./Order.Management.zod.validation";



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

 //update user infromation controller 

 const Update_User_Information=async(req:Request,res:Response)=>{

  try{
    const {userId}=req.params;
    const userData=req.body;

    const result=await UsersServices.UpdateUserInformation(Number(userId),userData);
    res.status(200).send({
        success:true,
        message:"User updated successfully!",
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

 //delete user infromation controller

 const deleteUser=async(req:Request,res:Response)=>{

    try{

        const {userId}=req.params;
        const result=await UsersServices.DeleteUserInformation(Number(userId));
        res.status(200).send({success:'true',message:"User deleted successfully!",data:result});

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

 //productOrder
 const product_Order=async(req:Request,res:Response)=>{

    try{

        const {userId}=req.params;
        const data=req.body;
        const orderValidation=TOrdersValidation.parse(data);
        const userOrder={id:Number(userId),...orderValidation}
        //const OrderValidtion=TOrdersValidation.parse(data);
        const result=await UsersServices.productOrder(Number(userId),userOrder);
        res.status(200).send({success:'true',message:"Order created successfully!",data:result});


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
//  specific User Order controller
const  specific_User_Order=async(req:Request,res:Response)=>{




  try{
    const {userId}=req.params;
    const result=await UsersServices.specificUserOrder(Number(userId));
    res.status(200).send({success:true,message:'Order fetched successfully!',orders:result})
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

// Calculate Total Price of Orders for a Specific User

const calculateTotalPrice_SpecificOrder=async(req:Request,res:Response)=>{

    try{
        const {userId}=req.params;
        const result=await UsersServices.calculateTotalPrice(Number(userId));
        res.status(200).send({success:true,message:'Total price calculated successfully!',data:result})
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
    specificUser_by_ID,
    Update_User_Information,
    deleteUser,
    product_Order,
    specific_User_Order,
    calculateTotalPrice_SpecificOrder
   
}