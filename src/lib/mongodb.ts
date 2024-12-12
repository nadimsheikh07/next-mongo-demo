import mongoose from 'mongoose';

let isConnected = false;

export const connectMongo = async () => {
    if (isConnected) return;

    try {
        await mongoose.connect(process.env.MONGO_URI as string, {});
        isConnected = true;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
};
