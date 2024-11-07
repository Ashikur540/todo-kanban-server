import catchAsyncError from "../hoc/catchAsyncError.js";
import Todo from "../models/todo.schema.js";
import ErrorHandler from "../utils/Error.js";



export const getAllTodos = catchAsyncError(
    async (req, res) => {
        try {
            const todos = await Todo.find({});
            res.json(todos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
)


export const createTodo = catchAsyncError(async (req, res) => {
    console.log("✨ ~ file: todos.controller.js:20 ~ createTodo ~ req:", req?.files)
    const { todo, attachments } = req.body;
    res.json({ success:true, todo, attachments });
})