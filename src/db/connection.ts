import mongoose from "mongoose";

const dbConnection = async ()=> {
    try {
        await mongoose.connect(process.env.MONGODB_URI as any)
        console.log('db connected')
    } catch (error) {
        console.error(error)
    }
}

export default dbConnection