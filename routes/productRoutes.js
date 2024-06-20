// backend/routes/productRoutes.js

import express from "express";
const router = express.Router();
import Product from '../models/Product.js';
import {createProducts,getAllProducts,updateProduct,deleteProduct,getProductDetails, createProductReview, getProductReviews} from "../controllers/productController.js"
import { isAuthenticatedUser,authorizeRoles } from "../middleware/auth.js";
// Get all products--Admin
router.route('/').get(getAllProducts)


router.route('/:id').put( isAuthenticatedUser,authorizeRoles("admin"),updateProduct).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct).get(getProductDetails)
router.route('/').post(isAuthenticatedUser,authorizeRoles("admin"),createProducts)
router.route('/review/:id').put(isAuthenticatedUser,createProductReview).get(getProductReviews)

export default router;
