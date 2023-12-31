const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//Create Product --Admin
exports.createProduct = catchAsyncErrors(async (req,res,next)=>{

   req.body.user = req.user.id
      const product = await Product.create(req.body);

       res.status(201).json({
          success:true,
          product
       })
})



//Get all products
exports.getAllProducts = catchAsyncErrors( async(req,res)=>{

  const resultPerPage = 5
  const productCount = await Product.countDocuments()

  const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage)
  const products = await apiFeature.query

  res.status(200).json({
    success:true,
    products
  })
})
 
 //GET PRODUCT details
 exports.getProductDetails = catchAsyncErrors(async(req,res,next)=>{

      const product = await Product.findById(req.params.id)
       if(!product){
            return next(new ErrorHandler("Product not found",404))
       }

        res.status(200).json({
          success:true,
          product,
          productCount,

        })
 })








//update product--admin
exports.updateProduct = catchAsyncErrors(async (req,res,next)=>{

 let product = await Product.findById(req.params.id)
 
   if(!product){
        
    return res.status(500).json({
         success:false,
         message:"Product not found"
      
    })
   }
    
   product = await Product.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true,
    useFindAndModify:false})

    res.status(200).json({
          success:true,
          product

    })
})

//DELETE PRODUCT --ADMIN
exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{

   const product = await Product.findById(req.params.id)

        if(!product){
            return res.status(500).json({
                 success:false,
                 message:"Product not found"

            })
        }

        await product.deleteOne()

        res.status(200).json({
          success:true,
          message:"Product Delete successfully"
        })


})
