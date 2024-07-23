import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
});

const Reminder = mongoose.models.Reminder || mongoose.model('Reminder', reminderSchema);

export default Reminder;
