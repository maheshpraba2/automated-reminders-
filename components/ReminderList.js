// src/ReminderList.js
import React from 'react';

function ReminderList({ reminders }) {
  return (
    <ul>
      {reminders.map((reminder, index) => (
        <li key={index}>
          {reminder.time} - {reminder.channel} - {reminder.patientType} - {reminder.visitType}
        </li>
      ))}
    </ul>
  );
}

export default ReminderList;