import mongoose from 'mongoose';

// Load environment variables
require('dotenv').config();

const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
  throw new Error('Define the MONGODB_URI environment variable');
}

let cachedClient = null;
let cachedDb = null;

async function dbConnect() {
  if (cachedDb) {
    return cachedDb;
  }

  if (!cachedClient) {
    cachedClient = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  cachedDb = cachedClient.connection;
  return cachedDb;
}

export default dbConnect;
