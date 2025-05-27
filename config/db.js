import mongoose from 'mongoose';
import dotenv from 'dotenv';
import expressAsyncHandler from 'express-async-handler';

dotenv.config()

const connectDB = expressAsyncHandler(async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB database connected ${conn.connection.host}`);
    }
    catch(err){
        console.log(`Error ${err.message}`);
        process.exit(1);
    }
});


export default connectDB;