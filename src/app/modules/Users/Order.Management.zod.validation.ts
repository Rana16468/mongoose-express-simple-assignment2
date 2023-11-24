import { z } from 'zod';

// Zod validation schema for TFullNameSchema
const TFullNameSchema = z.object({
  firstName: z.string().min(1,
    {message:'Minuman First Name Length 1 Character'}).max(30, 
    {message:'Maximum First Name Length 30 Character'}),
  lastName: z.string().min(1,
    {message:'Minuman Last Name Length 1 Character'}).max(30,
    {message:'Maximum Last Name Length 30 Character'}),
});

// Zod validation schema for TAddress
const TAddressSchema = z.object({
  street: z.string().min(1).max(50),
  city: z.string().min(1).max(50),
  country: z.string().min(1).max(50),
});

// Zod validation schema for TUser
const TUserSchemaValidation  = z.object({
  userId: z.number(),
  username: z.string().min(1),
  password: z.string().min(6,
    {message:'Minuman Password Length 6 character'}).max(30,
    {message:'Maximum Password Length 30 character'}),
  fullName: TFullNameSchema,
  age: z.number(),
  email: z.string().min(1).max(50).email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(1).max(50)),
  address: TAddressSchema,
});

//order valodion 
export  const TOrdersValidation=z.object({

  productName:z.string().min(1, {message:'Minuman Product Name Length 1 character'}).max(30, {message:'Maximum Product Name  Length 30 character'}),
  price:z.number(),
  quantity:z.number()


});



export default TUserSchemaValidation;