

import cors from 'cors';
import dotenv from 'dotenv';
import Express from 'express';
import todoRoutes from './routes/todos.routes.js';

dotenv.config()



const app = Express();

// place your middlewares here

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cors());



// define the routes of your application here

app.use('/api/v1/todos', todoRoutes);


export default app