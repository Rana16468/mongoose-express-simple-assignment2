import express, { Request, Response } from 'express';
import cors from 'cors';
import { UsersRouter } from './app/modules/Users/OrderManagement.router';
const app = express();

//parser
app.use(express.json());
//middlewere
app.use(cors())

app.use('/api',UsersRouter);

app.get('/', (req: Request, res: Response) => {

  
  res.status(200).json({success:true,message:'Order Management Server Successfully Running '})
});

export default app;
