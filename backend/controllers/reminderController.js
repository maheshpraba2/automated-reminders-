// backend/controllers/reminderController.js
const Reminder = require('../models/reminder');

exports.createReminder = async (req, res) => {
  const reminder = new Reminder(req.body);
  try {
    await reminder.save();
    res.status(201).send(reminder);
  } catch (error) {
    res.status(400).send(error);
  }
};
