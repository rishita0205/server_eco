import express from "express";
import { isAuthenticatedUser } from "../middleware/auth.js";
import { addToCart, deleteCartItem, getCartItems, updateCartItemQuantity } from "../controllers/CartController.js";

const router = express.Router();

// Route to add product to cart
router.route("/").post(isAuthenticatedUser, addToCart);
// Route to get all items in cart for logged-in user
router.route("/").get(isAuthenticatedUser, getCartItems);
// Route to update product quantity in cart
router.route("/:id").put(isAuthenticatedUser, updateCartItemQuantity);
// Route to delete product from cart
router.route("/:id").delete(isAuthenticatedUser, deleteCartItem);

export default router;
