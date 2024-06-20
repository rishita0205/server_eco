import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

// Add product to cart
export const addToCart = catchAsyncError(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  // Check if the product exists
  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Find the user's cart
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    // If the cart does not exist, create a new cart
    cart = new Cart({
      user: userId,
      items: [{ productId, quantity }]
    });
  } else {
    // If the cart exists, check if the product is already in the cart
    const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (productIndex > -1) {
      // If the product is already in the cart, update the quantity
      cart.items[productIndex].quantity += quantity;
    } else {
      // If the product is not in the cart, add it to the cart
      cart.items.push({ productId, quantity });
    }
  }

  // Save the cart
  await cart.save();

  res.status(200).json({
    success: true,
    cart
  });
});


// Get all items in cart for logged-in user
export const getCartItems = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;

  // Find the user's cart
  const cart = await Cart.findOne({ user: userId }).populate('items.productId', 'title name price image discountedPrice');

  if (!cart) {
    return next(new ErrorHandler("Cart not found", 404));
  }

  res.status(200).json({
    success: true,
    cart
  });
});

// Update quantity of a product in the cart
export const updateCartItemQuantity = catchAsyncError(async (req, res, next) => {
    const productId=req.params.id;
    const {  quantity } = req.body;
    const userId = req.user._id;
  
    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });
  
    if (!cart) {
      return next(new ErrorHandler("Cart not found", 404));
    }
  
    // Find the product in the cart
    const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
  
    if (productIndex === -1) {
      return next(new ErrorHandler("Product not found in cart", 404));
    }
  
    // Update the quantity
    cart.items[productIndex].quantity = quantity;
  
    // Save the updated cart
    await cart.save();
  
    res.status(200).json({
      success: true,
      cart
    });
  });
  

  // Delete product from cart
export const deleteCartItem = catchAsyncError(async (req, res, next) => {
    const productId=req.params.id;
    const userId = req.user._id;
  
    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });
  
    if (!cart) {
      return next(new ErrorHandler("Cart not found", 404));
    }
  
    // Find the product in the cart
    const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
  
    if (productIndex === -1) {
      return next(new ErrorHandler("Product not found in cart", 404));
    }
  
    // Remove the product from the cart
    cart.items.splice(productIndex, 1);
  
    // Save the updated cart
    await cart.save();
  
    res.status(200).json({
      success: true,
      cart
    });
  });
  
  // cartController.js

// Function to set an empty cart for a user
export const setEmptyCart = catchAsyncError(async (userId) => {
    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });
  
    if (!cart) {
      // If the cart does not exist, create a new cart
      cart = new Cart({
        user: userId,
        items: []
      });
    } else {
      // If the cart exists, clear all items
      cart.items = [];
    }
  
    // Save the updated or new cart
    await cart.save();
  });
  
