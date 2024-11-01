// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path')
const campaignRoutes = require('./routes/campaignRoutes');
const connectDB = require('./db');
require ('dotenv').config();

const app = express();

connectDB();

const allowedOrigins = [
    
    'https://add-campaign.vercel.app',  // Production frontend origin
    // 'http://localhost:5000', 
    // 'http://localhost:3000',// Development frontend origin
     // Development frontend origin
  ];
  
  const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        // Allow request if the origin is in the allowedOrigins list
        callback(null, true);
      } else {
        // Block request if the origin is not in the allowedOrigins list
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,  // Allow cookies and credentials to be sent
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
app.use(cors(corsOptions));
app.use(bodyParser.json());
// app.use('/uploads', express.static('../../build/uploads'));
app.use('/api', campaignRoutes);
app.enable('trust proxy')
app.use(express.static(path.resolve(__dirname, '../../build')));


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../build/index.html'));
});

// Simple route for the home page

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../build/index.html'));
});

const PORT = process.env.port || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
