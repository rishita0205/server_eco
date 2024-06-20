import express from "express";
const router = express.Router();
import User from '../models/User.js';
import {getUserDetails, loginUser, logout, registerUser, updateProfile, updateUserRole} from "../controllers/userController.js"
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logout)
router.route('/me').get(isAuthenticatedUser, getUserDetails)
router.route('/me/update').put(isAuthenticatedUser, updateProfile)
router.route('/:id').put(isAuthenticatedUser, authorizeRoles("admin"),updateUserRole)

export default router;

