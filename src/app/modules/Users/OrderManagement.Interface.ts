
import { Model } from "mongoose";


export type TFullName={
    firstName:string;
    lastName:string;
}

export type TAddress={
    street:string;
    city:string;
    country:string;
}
// order 
export type TOrders={

    productName:string;
    price:number;
    quantity:number;
}

export type TUser={
    userId:number,
    username:string;
    password:string;
    fullName:TFullName;
    age:number;
    email:string;
    isActive:boolean;
    hobbies:string[];
    address:TAddress;
    orders?:TOrders
}









export interface UserMethodModel extends Model<object>{

    // eslint-disable-next-line no-unused-vars
    isUserExists(id:number):Promise<object | null>
}