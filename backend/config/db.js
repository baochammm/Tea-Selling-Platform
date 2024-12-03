import mongoose from 'mongoose';
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
    try {
        const ok = await mongoose.connect(ENV_VARS.MONGO_URI)
        console.log('Connect successfully')
    }
    catch (err) {
        console.log(err)
    }

}