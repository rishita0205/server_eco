// backend/server.js
import dbConnection from './dbConfig/index.js';
import express from 'express';
import cors from 'cors';
import path from 'path'; 
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import cartRoutes from './routes/cartRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

console.log('MongoDB URI:', process.env.MONGODB_URI);
console.log('PORT:', process.env.PORT);
const app = express();
const PORT = process.env.PORT;

// Resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/public', express.static(path.join(__dirname, 'public')));
// Middleware
app.use(cors());
app.use(express.json());
// Serve static files from the 'public' directory
app.use('/public', express.static(path.join(__dirname, 'public')));
// MongoDB Connection
dbConnection();

 //routes
app.use('/products', productRoutes);

app.use('/cart', cartRoutes);
    

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
