import { Users } from "../../OrderManagement.model";
import { TOrders, TUser} from "./OrderManagement.Interface"

// create user 
const createUser=async(user:TUser)=>{

   const buildInInstanseUser=new Users(user);
   const result=await buildInInstanseUser.save();
   return result;
}
// find all user information 
const  retrieveAllUsers=async()=>{

    const result=await Users.find({},{ username: 1, fullName: 1, age: 1, email: 1, address: 1});
   
    return result;

    
}
// specific User Infrormation
const specificUserInformation=async(id:number)=>{

    
    if(await Users.isUserExists(id))
    {

        const result=await Users.aggregate([{$match:{userId:id}}]);
        return result;
    }
    else{
        throw new Error('Not Exists User Informathion in the Database')
    }
}

// update user information 

const UpdateUserInformation= async(id:number,data:object)=>{

    //password field not Included
    

   if(await Users.isUserExists(id))
   {
    Reflect.deleteProperty(data,'password');
    const filter={userId:id}
    const updateData={
      $set:{...data}
    }
    const result= await Users.updateOne(filter,updateData,{upsert:true});
    return result;
   }
   else{
      throw new Error('Not Exists User Informathion in the Database')
   }
}

//delete user information 
const DeleteUserInformation= async(id:number)=>{

   if(await Users.isUserExists(id))
   {
    const query={userId:id};
    const result=await Users.deleteOne(query);
    return result;
   }
   else{
    throw new Error('Not Exists User Informathion in the Database')
   }


}

//order information added using put method
const productOrder= async(id:number,data:TOrders)=>{

  
    if(await Users.isUserExists(id)){

       
       const result=await Users.updateOne({userId:id},{$push:{orders:data}})
         return result;
    }
    else{
        throw new Error('Not Exists User Informathion in the Database')
       }


}
 //Retrieve speciifc user Orders

 const specificUserOrder= async(id:number)=>{

    if(await Users.isUserExists(id))
    {
        const result=await Users.aggregate([{$match:{userId:id}}]).project({_id:0,orders:'$orders'});
        return result;

    }
    else{
        throw new Error('Not Exists User Informathion in the Database')
    }
}

// Calculate Total Price of Orders for a Specific User
const calculateTotalPrice= async(id:number)=>{

    if(await Users.isUserExists(id))
    {
        const result=await Users.aggregate([
            //state 1
            {$match:{userId:id}},
            //statge 2
            {$unwind:'$orders'},
            //state 3 
            {$project:{SpecificFieldPrice:{$sum:{$multiply:['$orders.price','$orders.quantity']}}}},
            //stage 4
            {$group:{_id: null,totalPrice:{$sum:'$SpecificFieldPrice'}}}
        ]).project({_id:0})
        return result;
    }
    else{
        throw new Error('Not Exists User Informathion in the Database')
    }

    


}

export const UsersServices={
    createUser,
    retrieveAllUsers,
    specificUserInformation,
    UpdateUserInformation,
    DeleteUserInformation,
    productOrder,
    specificUserOrder,
    calculateTotalPrice


}

