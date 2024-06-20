// backend/server.js
import express from 'express';
import cors from 'cors';
import path from 'path'; 
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser'; // Import cookie-parser
import dbConnection from './dbConfig/index.js';
import cartRoutes from './routes/cartRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorMiddleware from './middleware/error.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

// MongoDB Connection
dbConnection();

// Resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware

// Serve static files from the 'public' directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/user', userRoutes); 

// Error Middleware
app.use(errorMiddleware);

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
        process.exit(1);
    });
});
