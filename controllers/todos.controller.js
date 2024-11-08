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


    const { todo } = req.body;
    const attachmentUrls = req.uploadedFiles; // Access the uploaded URLs here

    // Save to database with the URLs
    const newTodo = await Todo.create({
        todo,
        attachments: attachmentUrls
    });

    res.json({ success: true, todo: newTodo });
});



export const updateTodo = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const { todo } = req.body;
    const attachmentUrls = req.uploadedFiles;

    const todoToUpdate = await Todo.findById(id);
    if (!todoToUpdate) {
        return next(new ErrorHandler(`Todo not found`, 400));
    }

    const updatedTodo = await Todo.updateOne(
        {_id: id},
        {
            todo,
            ...(attachmentUrls?.length && {
                $push: { attachments: { $each: attachmentUrls } }
            })
        },
        { new: true }
    );

    res.status(200).json({
        success: true,
        message: "Todo updated successfully",
        todo: updatedTodo
    });
});
