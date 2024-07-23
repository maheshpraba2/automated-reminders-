// backend/db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env.local

const mongoURI = process.env.MONGODB_URI;

if (mongoose.connection.readyState === 0) {
  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected to Reminders database'))
    .catch(err => console.error('MongoDB connection error:', err));
}

module.exports = mongoose;
