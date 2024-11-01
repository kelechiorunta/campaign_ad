
const mongoose = require('mongoose')
const uri = process.env.MONGODB_URI
require('dotenv').config();


const connectDB = async () => {

    try {
        console.log('Trying to connect to MongoDB...');
        console.log(process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI); 
        console.log('MongoDB connected successfully!');

    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;