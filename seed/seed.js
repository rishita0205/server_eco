// server/seed/seeds.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js'; // Adjust this if the path is different

// Load environment variables
dotenv.config();

const seedData = [
    {
        _id: "64df3aec4180b81adfe41d32",
        title: "Neo Water Flow Restrictors (NFR)- 3 to 4LPM",
        image: "public/image974.png", // Updated path
        price: 299,
        discountedPrice: 165,
        verified: true,
        rating: "4.9",
        stock: 20,
    },
    {
        _id: "64df39704180b81adfe41d0b",
        title: "Anti-Theft Shell Tap Adapter 3 LPM (Pack of 2)",
        image: "public/image974.png", // Updated path
        price: 299,
        discountedPrice: 165,
        verified: true,
        rating: "4.9",
        stock: 3,
    },
    {
        _id: "64df39704180b81adfe41d0c",
        title: "AirOxy 3 Function Shower Head",
        image: "public/image974.png", // Updated path
        price: 299,
        stock: 10,
        verified: true,
        rating: "4.9",
    },
    {
        _id: "64df39704180b81adfe41d0d",
        title: "Dual flow chrome finish jet and eco flow aerator",
        image: "public/image974.png", // Updated path
        price: 299,
        discountedPrice: 165,
        verified: false,
        stock: 0,
        rating: "4.9",
    },
];

async function seedProducts() {
    try {
        const uri = process.env.MONGODB_URI;
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected successfully');

        await Product.deleteMany(); // Clear existing data

        await Product.insertMany(seedData);

        console.log('Seed data inserted successfully');
    } catch (error) {
        console.error('Error inserting seed data:', error);
    } finally {
        mongoose.disconnect();
    }
}

seedProducts();
