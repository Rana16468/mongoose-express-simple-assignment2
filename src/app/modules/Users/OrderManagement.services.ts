import { Users } from "../../OrderManagement.model";
import { TUser } from "./OrderManagement.Interface"

// create user 
const createUser=async(user:TUser)=>{

   const buildInInstanseUser=new Users(user);
   const result=await buildInInstanseUser.save();
   return result;
}
// find all user information 
const  retrieveAllUsers=async()=>{

    const result=await Users.find({},{ username: 1, fullName: 1, age: 1, email: 1, address: 1 });
   return result;

    
}
// specific User Infrormation
const specificUserInformation=async(id:number)=>{

  

    const result=await Users.findOne({userId:id},{password:0});
    return result;


}
export const UsersServices={
    createUser,
    retrieveAllUsers,
    specificUserInformation

}

