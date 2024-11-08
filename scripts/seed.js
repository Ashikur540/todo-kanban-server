import mongoose from "mongoose";
import { faker } from "@faker-js/faker";

import Todo from "../models/todo.schema.js";
import connectDB from "../utils/connectDb.js";





connectDB()


const cloudinaryImageUrl = "https://res.cloudinary.com/dpwzymugl/image/upload/v1731064083/my-leet-code-profile-1731064078657.png.png";


const generateFakeTodos = (count) => {
    const todos = [];
    const statuses = ["incomplete", "todo", "doing", "completed", "overdue"];

    for (let i = 0; i < count; i++) {
        // Generate a random number of attachments with the same image URL (between 5 and 25)
        const attachments = Array.from({ length: faker.number.int({ min: 5, max: 15 }) }, () => cloudinaryImageUrl);

        todos.push({
            todo: faker.lorem.sentence(),
            attachments: attachments,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            createdAt: faker.date.past()
        });
    }

    return todos;
};

// Seed the database
const seedDatabase = async () => {
    try {
        await Todo.deleteMany({}); // Clear existing todos
        const fakeTodos = generateFakeTodos(50); // Generate 50 fake todos
        await Todo.insertMany(fakeTodos);
        console.log("Database seeded with fake todos!");
    } catch (error) {
        console.error("Error seeding the database:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();