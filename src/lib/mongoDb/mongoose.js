import mongoose from 'mongoose';

let initialized = false;

export const connect = async () => {
    mongoose.set('strictQuery', true);
    if(initialized) {
        console.log('Connected');
        return;
    }

    try {

        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'next-social-app',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected successfully.');
        initialized = true;
    }catch (error) {
        console.error('Failed to connect', error);
    }
};