import Product from "../models/Product.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ApiFeatures from "../utils/apifeatures.js";
const createProducts = catchAsyncError(async (req, res, next) => {
  req.body.user=req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
      success: true,
      product,
  });

})
//get products
const getAllProducts = catchAsyncError(async (req, res) => {
  
 
  const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter()
  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products
  });
})

// Update Product -- Admin

const updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found",404))
    }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
})


// Delete Product

const deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found",404))
    }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
})
// Get Product Details
const getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  
  if (!product) {
  return next(new ErrorHandler("product not found",404))
  }
  
  res.status(200).json({
  success: true,
  product,
  });
  
})

// Create New Review or Update the review
const createProductReview = catchAsyncError(async (req, res, next) => {
  const { rated, comment } = req.body;
  const userId = req.user._id;

  const review = {
    user: userId,
    name: req.user.name,
    rated: Number(rated),
    comment,
  };

  const product = await Product.findById(req.params.id);

  
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rated;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
const getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});


export {createProducts,getAllProducts,updateProduct,getProductDetails,createProductReview,getProductReviews,deleteProduct};

