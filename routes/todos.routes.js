import express from 'express';
import { handleMulterError, upload, uploadMultipleFiles } from '../middlewares/multer.middleware.js';
import { createTodo, getAllTodos, updateTodo } from '../controllers/todos.controller.js';

//  import middlewares to protect routes

const todoRoutes = express.Router()

// // declare your routes here
todoRoutes.get("/", getAllTodos);
todoRoutes.post("/create", upload.array('attachments_files', 3), handleMulterError, uploadMultipleFiles, createTodo);
todoRoutes.patch("/:id", upload.array('attachments_files', 3), handleMulterError, uploadMultipleFiles, updateTodo);


export default todoRoutes;