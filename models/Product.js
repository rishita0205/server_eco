// backend/models/Product.js
import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        max:[999999,"Price Should not more than 999999"]
    },
    description: String,
    image: {
        type: String,
       
    },
    category:{
        type:String,
        required:[true,"please enter product category"],
    },
    discountedPrice: Number,
    verified: Boolean,
    ratings: {
        type: Number,
        default: 0,
      },
    numOfReviews: {
        type: Number,
        default: 0,
      },
    stock: {
        type: Number,
        required: [true,"Please enter Product stock"],
        max:[9999,"Stock cannot be more than 9999"],
        default:1
    },
    reviews:[{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
          },
        name:{
            type:String,
            required:true,
        },
        rated:{
            type:Number,
            required:true,
        },
        comment:{
            type:String,
            required:true,
        }
    }],
    createdAt:{
      type:Date,
      default:Date.now
    },
    user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true
    }
});

export default  mongoose.model('Product', productSchema);
