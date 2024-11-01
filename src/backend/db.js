
const mongoose = require('mongoose')
const uri = process.env.MONGODB_URI



const connectDB = async () => {

    try {
        console.log('Trying to connect to MongoDB...');
        await mongoose.connect(uri); 
        console.log('MongoDB connected successfully!');

    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;