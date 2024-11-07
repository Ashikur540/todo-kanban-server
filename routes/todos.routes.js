import express from 'express';
import { upload, uploadMultipleFiles } from '../middlewares/multer.middleware.js';
import { createTodo, getAllTodos } from '../controllers/todos.controller.js';

//  import middlewares to protect routes

const todoRoutes = express.Router()

// // declare your routes here
todoRoutes.get("/", getAllTodos);
todoRoutes.post("/create", upload.array('attachments_files', 3), uploadMultipleFiles,createTodo);


export default todoRoutes;