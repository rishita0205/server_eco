// backend/models/Product.js
import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    image: {
        type: String,
        required: true
    },
    discountedPrice: Number,
    verified: Boolean,
    rating: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
});

export default  mongoose.model('Product', productSchema);
