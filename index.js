import dotenv from 'dotenv';
import app from './app.js';
import errorHandlerMiddleware from "./middlewares/common/errorHandlerMiddleware.js";
import connectDB from './utils/connectDb.js';
dotenv.config();

const PORT = process.env.PORT || 3000


connectDB();

app.get('/health', (req, res) => {
    res.send('server is running');
});

const server = app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});


// handle unhandled promise rejections
process.on("unhandledRejection", err => {
    console.log(`An error occurred: ${err.message}`)
    server.close(() => process.exit(1))
})

app.use(errorHandlerMiddleware)