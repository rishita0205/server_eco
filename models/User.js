import mongoose, { Schema } from "mongoose";

//schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is Required!"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is Required!"],
    },
    email: {
      type: String,
      required: [true, " Email is Required!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is Required!"],
      minlength: [6, "Password length should be greater than 6 character"],
      select: false,
    },
    verify: { type: Boolean, default: false },
  },
  
);

const Users = mongoose.model("Users", userSchema);
/*This line effectively creates a model named "Users" and assigns it to the constant variable Users.This variable holds the reference to the Mongoose model created for the "Users" collection based on the provided schema (userSchema).*/

export default Users;