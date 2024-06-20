import mongoose from "mongoose";
import * as dotenv from "dotenv"
const dbConnection =  () => {
    mongoose
    .connect(process.env.MONGODB_URI)
    .then((data) => {
      console.log(`Mongodb connected with server`);
    });
}
export default dbConnection;