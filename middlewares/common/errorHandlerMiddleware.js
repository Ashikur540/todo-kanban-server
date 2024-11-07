const errorHandlerMiddleware = (err, req, res, next) => {
    console.log("🚀 whole error >", err)
    console.log("🚀 errorHanlderMiddleware ~ error message:", err.message)
    err.message = err.message || 'Internal Server Error';
    err.statusCode = err.statusCode || 500;
    //  create your own custom errors with status code 
    /* if (err.code === 11000) {
         err.message = `Duplicate Field Value Enter`;
         err.statusCode = 400;  // bad request
     }

      // JWT Error
    if (err.name === 'JsonWebTokenError') {
        const message = 'Invalid token';
        err = new ErrorHandler(message, 401);
    }
     */

    // multer file limit error
    if (err.code === 'LIMIT_FILE_SIZE') {
        err.message = 'File is too large. Please upload file less than 2MB';
        err.statusCode = 400;
    }


    //  create your own custom errors with status code 
    res.status(err.statusCode).send({
        success: false,
        message: err.message,
    })

}
export default errorHandlerMiddleware;