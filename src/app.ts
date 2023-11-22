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

  
  res.send('Hello World!');
});

export default app;
