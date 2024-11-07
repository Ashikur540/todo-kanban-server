import catchAsyncError from "../hoc/catchAsyncError.js";
import Product from "../models/product.schema.js";
import ErrorHandler from "../utils/Error.js";


export const getAllProducts = catchAsyncError(
    async (req, res) => {
        try {
            const products = await Product.find({});
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
)

export const getProductById = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
        // If product not found, return error immediately
        return next(new ErrorHandler(`Product not found with id: ${req.params.id}`, 404));
    }
    
    // If product exists, send response
    res.json(product);
});




export const addNewProduct = catchAsyncError(
    async (req, res) => {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            description: req.body.description
        });


        const newProduct = await product.save();
        if (newProduct)
            res.status(201).json(newProduct);  

    }
)