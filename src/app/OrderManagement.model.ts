/* eslint-disable @typescript-eslint/no-this-alias */
import {  Schema, model } from 'mongoose';
import { TAddress, TFullName, TUser } from './modules/Users/OrderManagement.Interface';
import bcrypt   from 'bcrypt';
import config from './config';


const TFullNameSchema=new Schema<TFullName>({
    firstName:{type:String,required:[true,'First Name is Required']},
    lastName:{type:String,required:[true,'Last Name is Required']}

});

const TAddressSchema=new Schema<TAddress>({
    street:{type:String,required:[true,'Street is Required']},
    city:{type:String,required:[true,'City is Required']},
    country:{type:String,required:[true,'Country is Required']}

})

const TUserSchema= new Schema<TUser>({

userId:{type:Number,required:[true,'UserId is Requiresd'],unique:true},
username:{type:String,required:[true,'User Name is Required'],unique:true},
password:{type:String,required:[true,'Password is Requires']},
fullName:{type:TFullNameSchema,required:[true,'Full Name is Requires']},
age:{type:Number,required:[true,'Age is Required']},
email:{type:String,required:[true,'Email is Required'],unique:true},
isActive:{type:Boolean,required:[true,'isActive is Required']},
hobbies:{type:[String],required:[true,'Hobbies is Required']},
address:{type:TAddressSchema,required:[true,'Address is Required']}
});

//mongoode middlewere 
TUserSchema.pre('save', async function(next){

    const user=this;
    user.password=await bcrypt.hash(user.password,Number(config.bcrypt_salt_rounds));
    next();
});

TUserSchema.post('save',function(doc,next){ 
   
   doc.password=""

    next();
  
})


//Users Modules
export const Users= model<TUser>('users',TUserSchema);