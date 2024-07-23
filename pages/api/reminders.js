// pages/api/reminders.js
import mongoose from 'mongoose';
import Reminder from '../../backend/models/reminder'; // Adjust the path if necessary

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
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

// API handler function
export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { title, date, description } = req.body;

      // Create a new reminder
      const newReminder = new Reminder({ title, date, description });
      await newReminder.save();

      res.status(200).json({ message: 'Reminder set successfully', data: newReminder });
    } catch (error) {
      console.error('Error setting reminder:', error);
      res.status(500).json({ error: 'Failed to set reminder' });
    }
  } else if (req.method === 'GET') {
    try {
      // Retrieve all reminders
      const reminders = await Reminder.find();
      res.status(200).json(reminders);
    } catch (error) {
      console.error('Error retrieving reminders:', error);
      res.status(500).json({ error: 'Failed to retrieve reminders' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
