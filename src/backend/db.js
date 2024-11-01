const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose')
// const uri = process.env.MONGO_DB_URI//"mongodb+srv://oruntakelechi86:4pHwh0cojYMj49aD@kelechi0.0to4y.mongodb.net/MyMongoDB?retryWrites=true&w=majority&appName=Kelechi0";
const uri="mongodb+srv://oruntakelechi86:4pHwh0cojYMj49aD@kelechi0.0to4y.mongodb.net/MyMongoDB?retryWrites=true&w=majority&appName=Kelechi0"
//const uri = "mongodb+srv://oruntakelechi86:4pHwh0cojYMj49aD@kelechi0.0to4y.mongodb.net/MyMongoDB?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true";
//const uri = "mongodb://oruntakelechi86:4pHwh0cojYMj49aD@kelechi0.0to4y.mongodb.net/MyMongoDB?retryWrites=true&w=majority&ssl=false";


const connectDB = async () => {
    try {
        console.log('Trying to connect to MongoDB...');
        await mongoose.connect(uri); // No need for `useNewUrlParser` or `useUnifiedTopology`
        console.log('MongoDB connected successfully!');

    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;