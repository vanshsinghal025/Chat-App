import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('MONGODB connected successfully')
    } catch (error) {
        console.error('Error in connecting to MONGODB')
        console.error(error)
        process.exit(1)
    }
}

export default connectDB