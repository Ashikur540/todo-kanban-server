import mongoose, { model } from "mongoose";


const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true
    },
    attachments:{
        type: Array,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});



const Todo = model('Todo', todoSchema);
export default Todo;