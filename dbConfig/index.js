import mongoose from "mongoose";
import * as dotenv from "dotenv"
const dbConnection = async () => {
    try {
            const connection = await mongoose.connect(process.env.MONGODB_URI);
            console.log("Database connected successfully")
        } catch (error) {
            console.log(error);
        }
}
export default dbConnection;