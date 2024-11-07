import multer from "multer";
import path from "path";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

import catchAsyncError from "../hoc/catchAsyncError.js";


const MAX_FILE_SIZE = 2000000; // 2MB


const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, file.originalname)
    // },
    filename: function (req, file, cb) {
        // separating file name and extension and process the file name
        const fileExt = path.extname(file.originalname)
        const fileName = file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("-") + "-" + Date.now();
        cb(null, fileName + fileExt)
    }
})


export const upload = multer({
    storage: storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (req, file, cb) => {
        console.log("✨ ~ file: multer.middleware.js:20 ~ file:", file)
        // accept only images and pdf
        if (!file.mimetype.match(/(jpeg|jpg|png|gif|pdf)$/)) {
            return cb(new Error('Only images and pdf are allowed!'))
        }
        cb(null, true)
    }
})




// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadMultipleFiles = catchAsyncError(
    async (req, res, next) => {
        // console.log("🚀 ~ uploadMultipleFiles ~ req.files", req.files)
        // Upload an image

        for (const file of req?.files) {
            const uploadResult = await cloudinary.uploader
                .upload(
                    file.path, {
                    public_id: file.filename,
                }
                )
                .catch((error) => {
                    console.log(error);
                });

            console.log(uploadResult?.secure_url);
        }
        // console.log(uploadResult);
        next()
    }
)


