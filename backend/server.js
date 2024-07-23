// server.js

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create an instance of Express
const app = express();

// Use bodyParser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost/automated-reminders', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a Mongoose schema for reminders
const reminderSchema = new mongoose.Schema({
  time: String,
  channel: String,
  patientType: String,
  visitType: String,
});

// Create a Mongoose model based on the schema
const Reminder = mongoose.model('Reminder', reminderSchema);

// Define an endpoint to create a new reminder
app.post('/api/reminders', async (req, res) => {
  try {
    const reminder = new Reminder(req.body);
    await reminder.save();
    res.status(201).send(reminder);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Define an endpoint to get all reminders
app.get('/api/reminders', async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.status(200).send(reminders);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Start the server and listen on port 5000
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
